from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from django.shortcuts import get_object_or_404
import os

# transformar imagen
from wand.image import Image as WandImage
from django.core.files.base import ContentFile


#Comparar objetos
from django.db.models import Q

#generar cookies
import uuid

#enviar correo
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

#coger variables del .env
from django.conf import settings

#trabajar con json
import json

#evita la verficación csrf 
from django.views.decorators.csrf import csrf_exempt


#generar tokens para el usuario
import hashlib

#encriptar tokens
from cryptography.fernet import Fernet
import base64


#trabajar con fechas
from datetime import datetime,timedelta
from django.utils import timezone

#Trabajar con aleatoriedad
from random import shuffle

CLAVE_SECRETA = settings.SECRET_CRYPTED_KEY.encode()


#testear que el servidor devuelve json correctamente
def test(request):
    data = {
        'message': 'El servidor funciona perfectapente',
        'status': 'success'
    }
    
    return JsonResponse(data)

#testear que el servidor funciona correctamente
def index(request):   
    return render(request, 'index.html')

########### Vistas de autenticación ########### 

#login usuario
@csrf_exempt
def login(request):
    response = {}    

    errors = {}


    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        email = data.get("email")
        password = data.get("password")

        usuario = Usuario.objects.filter(Q(email=email) | Q(username=email))
        

        if not usuario:
            errors["not_email"] = "No existe una cuenta asociada a ese correo o usuario."
        else:
            usuario = usuario[0]
            if usuario.email_verified == False:
                errors["unverified_email"] = "No has verificado el correo."

            if not usuario.verify_password(password):
                errors["bad_password"] = "Contraseña incorrecta."

        if len(errors) == 0: 
            

            valor_cookie = str(uuid.uuid4())

            sesion_cookie = SessionCookie(
                user = usuario,
                value = valor_cookie,
            )
            sesion_cookie.save()


            response["cookie"] = valor_cookie  
            data = {
                "status": "success",
                "errors": errors,
                "response":response
            }
        else:
            data = {
                "status": "error",
                "errors": errors, 
            }   


    return JsonResponse(data)



#registrar usuario
@csrf_exempt
def register(request):
    errors = {}

 
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))

        name = data.get("name")

        if len(name) < 3:
            errors["short_name"] = "El nombre debe contener al menos 3 carácteres."


        last_name = data.get("last_name")

        if len(last_name) < 3:
            errors["short_lastname"] ="Los apellidos deben contener al menos 3 carácteres."     


        password = data.get("password")

        rep_password = data.get("rep_password")

        if len(password) < 5:
            errors["short_password"] = "La contraseña debe contener al menos 5 carácteres." 

        if password != rep_password:
            errors["different_password"] = "Los contraseñas no coinciden."

        email = data.get("email")
        
        if checkIfEmailExist(email):
            errors["email_exist"] = "Ese correo ya existe."

        username = data.get("username")

        if len(username) > 15:
            errors["large_username"] = "El nombre de usuario es demasiado largo."

        if checkIfUsernameExist(username):
            errors["username_exist"] = "Vaya... ese nombre de usuarios ya existe."


        if len(errors) == 0:

            verification_token = generate_token((email+name))

            new_user  = Usuario(
                username=username,
                name=name,
                last_name=last_name,
                password=password,
                email=email,
                verification_token=verification_token
            )
           
            new_user.save()
            
            data = {
                "status": "success",
                "errors": errors,
            }

            send_verify_mail(name,email, verification_token)

        else:
            data = {
                "status": "error",
                "errors": errors,
            }
    
    return JsonResponse(data)


#comprubea si el email existe en la BD    
def checkIfEmailExist(email):
    emailExist = False

    emails = Usuario.objects.all()
    
    for userEmail in emails:
        if userEmail.email == email:
            emailExist = True
 
    return emailExist

#comprubea si el nombre de usuario existe en la BD    
def checkIfUsernameExist(username):
    usernameExist = False

    usernames = Usuario.objects.all()
    
    for user in usernames:
        if user.username == username:
            usernameExist = True
 
    return usernameExist

@csrf_exempt
def verify_mail(request):

    data = {"status":"error"}

    if request.method == "POST":

        data_post = json.loads(request.body.decode('utf-8'))
        token = data_post.get("token")

        f = Fernet(CLAVE_SECRETA)
        token_bytes = token.encode()
        mensaje = f.decrypt(token_bytes)
        datos = mensaje.decode()
        token_codificado, fecha_str = datos.split("/")
        
        fecha = datetime.strptime(fecha_str, "%Y-%m-%d")
    
        caducidad = fecha + timedelta(days=2)
    
        if caducidad > datetime.now():
            usuario = get_object_or_404(Usuario, verification_token=token_codificado)  
    
            if usuario:
                
                perfil = PerfilUsuario.objects.filter(usuario = usuario)
                if len(perfil) == 0:
                    usuario.email_verified = True
                    usuario.save()
        
                    nuevo_perfil = PerfilUsuario(usuario=usuario)
                    nuevo_perfil.save()
    
                data = {"status": "success"}
            else:
                data = {"status": "error", "mensaje": "El usuario asociado al token no existe"}
        else:
            data = {"status": "error", "mensaje": "El token ha caducado"}

    
    return JsonResponse(data)





#envia un email para verificar el correo

@csrf_exempt
def send_verify_mail(name, email, token):


    fecha_hoy = datetime.now().strftime("%Y-%m-%d")

    mensaje_original = f"{token}/{fecha_hoy}"

    f = Fernet(CLAVE_SECRETA)

    mensaje_encriptado = f.encrypt(mensaje_original.encode())


    enlace_verificacion = f"{settings.APP_WEB_HOST}verify-email/{mensaje_encriptado.decode()}/"

    asunto = "¡Verifica tu correo!"
    mensaje = f"""Hola {name},

    Solo un paso más para comenzar. Necesitamos verificar tu dirección de correo electrónico.

    Haz clic en el enlace a continuación para confirmar tu dirección de correo electrónico y empezar:
    {enlace_verificacion}

    ¡Gracias por unirte!

    Atentamente,
    El Equipo de Spot Peeker"""

    remitente = settings.EMAIL_HOST_USER
    destinatario = [email]

    send_mail(asunto, mensaje, remitente, destinatario)

#genera un token de usuario
def generate_token(str):
    bytes = str.encode('utf-8')
    hash_obj = hashlib.sha256()
    hash_obj.update(bytes)
    token = hash_obj.hexdigest()
    return token

#verifica si la cookie de sesion es válida
@csrf_exempt
def verify_session_cookie(request):
    data = {"valid": False}   

    if request.method == "POST":

        data_post = json.loads(request.body.decode('utf-8'))
        cookie = data_post.get("auth_token")
        cookie_sesion = SessionCookie.objects.filter(value=cookie)

        if cookie_sesion:

            expiration_date = cookie_sesion[0].created + timedelta(days=1)

            if expiration_date > timezone.now():
                data = {"valid": True}  
            else:
                cookie_sesion.delete()
                
            

    return JsonResponse(data)

@csrf_exempt
def getUserData(request):

    data = {"status":"error"}

    user = getUserRequest(request)

    if user:

        usuario = {
            "username": user.username,
            "name": user.name,
            "last_name": user.last_name,
            "email": user.email,
        }
        data = {"status":"success","user":usuario}

    return JsonResponse(data)




#con una cookie de sesion, devuelve usuario y perfil
@csrf_exempt
def getUserProfileData(request,username):

    data = {
        "status": "error"
    }

    try:
        user = Usuario.objects.get(username=username)

        if user:
            usuario = {
                "username": user.username,
                "name": user.name,
                "last_name": user.last_name,
                "email": user.email,
            }

            data["usuario"] = usuario
            data["status"] = "success"

            try:
                profile_likes=0

                current_profile = getPerfilRequest(request)

                perfil = PerfilUsuario.objects.get(usuario=user)
                

                followers = Seguidor.objects.filter(siguiendo=perfil)


                follow = Seguidor.objects.filter(seguidor=current_profile,siguiendo=perfil)

                perfil_usuario = {
                    "foto_perfil": perfil.foto_perfil.url,
                    "aka": perfil.aka,
                    "biografia": perfil.biografia,
                    "es_privado": perfil.perfil_privado,
                    "es_premium": perfil.premium,
                    "followers": len(followers),
                    "followed": follow.exists(),
                }

                publicaciones = []
                posts = Publicacion.objects.filter(autor=perfil)

                for post in posts:
                    post_tags = list(post.etiquetas.all().values())
                    post_photos = list(post.imagenes.all().values())


                    existing_like = MeGusta.objects.filter(usuario=current_profile, publicacion=post)



                    try:

                        likes = MeGusta.objects.filter(publicacion=post)
                        likes = len(likes)
                        profile_likes+=likes

                    except (SessionCookie.DoesNotExist, Usuario.DoesNotExist):
                        likes = 0


                    publicacion = {
                        "id": post.pk,
                        "autor": post.autor.usuario.username,
                        'descripcion': post.descripcion,
                        'ubicacion': post.ubicacion,
                        'etiquetas': post_tags,
                        'imagenes': post_photos,
                        "likes":likes,
                        "liked_by_user": existing_like.exists(),

                    }
                    publicaciones.append(publicacion)

                

                perfil_usuario["likes_perfil"] = profile_likes
                perfil_usuario["num_post"] = len(publicaciones)

                publicaciones.reverse()
                data["publicaciones"] = publicaciones
                data["perfil"] = perfil_usuario
            except PerfilUsuario.DoesNotExist:
                data["status"] = "error"
                data["message"] = "Perfil not found"
    except (SessionCookie.DoesNotExist, Usuario.DoesNotExist):
        pass

    return JsonResponse(data)

def getUserRequest(request):
    usuario = None
    cookie = request.COOKIES.get("auth_token")

    if cookie:
        try:
            session_cookie = SessionCookie.objects.get(value=cookie)
            usuario = Usuario.objects.get(id=session_cookie.user_id)
        except (SessionCookie.DoesNotExist, Usuario.DoesNotExist):
            pass

    return usuario

def getPerfilRequest(request):
    perfil = False

    cookie = request.COOKIES.get("auth_token")

    if cookie:
        session_cookie = SessionCookie.objects.filter(value=cookie)
        if session_cookie:
            user_id = session_cookie[0].user_id
            user = Usuario.objects.filter(id = user_id)
            if user:
                perfil = PerfilUsuario.objects.filter(usuario=user[0])[0]

    return perfil


#actualiza la foto de perfil de un usuario

@csrf_exempt
def uploadPicProfile(request):
    data = {"status": "error"}

    if request.method == 'POST' and request.FILES['pic']:
        pic = request.FILES['pic']
        
        perfil = getPerfilRequest(request)

        if perfil:
            pic_name = f"{perfil.usuario}_pic_profile.webp"
            # Leer la imagen en memoria
            pic_content = pic.read()

            # Convertir la imagen a formato WebP usando Wand
            with WandImage(blob=pic_content) as img:
                webp_content = img.make_blob(format='webp')

            # Guardar la imagen convertida en el perfil
            perfil.foto_perfil.save(pic_name, ContentFile(webp_content), save=True)

            data = {"status": "success"}

    return JsonResponse(data)


@csrf_exempt
def logout(request):

    data = {"status": False}   

    if request.method == "POST":
        
        cookie = request.COOKIES.get("auth_token")

        
        cookie_sesion = SessionCookie.objects.filter(value=cookie)

        if cookie_sesion:

            cookie_sesion.delete()
            data = {"status": True}

    return JsonResponse(data)

def generatePhotoName(name):
    raw_name = name.split('.')  
    extension = raw_name[-1] 
    new_name = f"{uuid.uuid4()}.{extension}"
    return new_name
   
#subir post
@csrf_exempt
def uploadPost(request):
    data = {"status": "error"}
    errors = {}
    max_size = 10 * 1024 * 1024 
    allowed_types = ['image/jpeg', 'image/png','image/gif']

    if request.method == 'POST' and request.FILES:

        perfil = getPerfilRequest(request)

        if perfil:

            
            description = request.POST.get('description', '')
            tags = request.POST.getlist('tags', [])
            coords = request.POST.get('coords', '')
            photos_list = []
            photos = request.FILES.getlist('photos')

            tags = json.loads(tags[0])


            for photo in photos:
                if photo.size > max_size:
                    errors["max_size"] = "El archivo " + photo.name+ " pesa demasiado. (10MB max)"
                    


                if photo.content_type not in allowed_types:
                    errors["bad_type"] = "Tipo de archivo no válido ("+photo.name+")"
                
                photos_list.append(photo) 

            if len(errors) == 0:

                publicacion = Publicacion(
                    autor=perfil,
                    descripcion=description,
                    ubicacion=coords
                )

                publicacion.save()

                for photo in photos_list:
                    try:
                        imagen = Imagen()
                        filename = generatePhotoName(photo.name)
                        imagen.imagen.save(filename,photo)
                        publicacion.imagenes.add(imagen)
                    except Exception as e:
                        errors["server_error_photos"] = f"{e}"

                for tag in tags:
                    try:
                        etiqueta = Etiqueta(nombre=tag)
                        etiqueta.save()
                        publicacion.etiquetas.add(etiqueta)
                    except Exception as e:
                        errors["server_error_tags"] = f"{e}"

                data = {"status": "success"}

    if not request.FILES:
        errors["no_photo"] = "Debes subir al menos una foto."
        
    
    if len(errors) != 0:
        data = {
            "status": "error",
            "errors": errors,
        }


    return JsonResponse(data)  

@csrf_exempt
def editUploadPost(request):

    data = {"status": "error"}
    errors = {}
    max_size = 10 * 1024 * 1024 
    allowed_types = ['image/jpeg', 'image/png','image/gif']

    if request.method == 'POST' and request.FILES:

        perfil = getPerfilRequest(request)

        if perfil:

            
            description = request.POST.get('description', '')
            post_id = request.POST.get('post_id', '')

            tags = request.POST.getlist('tags', [])
            coords = request.POST.get('coords', '')
            photos_list = []
            photos = request.FILES.getlist('photos')

            tags = json.loads(tags[0])





            for photo in photos:
                if photo.size > max_size:
                    errors["max_size"] = "El archivo " + photo.name+ " pesa demasiado. (10MB max)"
                    


                if photo.content_type not in allowed_types:
                    errors["bad_type"] = "Tipo de archivo no válido ("+photo.name+")"
                
                photos_list.append(photo) 

            if len(errors) == 0:
                publicacion = Publicacion.objects.get(pk = post_id)

                if publicacion.autor == perfil:
                

                    if publicacion.descripcion != description:

                        publicacion.descripcion = description

                    if publicacion.ubicacion != coords:
                        publicacion.ubicacion = coords


                    publicacion.save()

                    deletePostImages(publicacion)

                    publicacion.imagenes.all().delete()


                    for photo in photos_list:
                        try:
                            imagen = Imagen()
                            filename = generatePhotoName(photo.name)
                            imagen.imagen.save(filename,photo)
                            publicacion.imagenes.add(imagen)
                        except Exception as e:
                            errors["server_error_photos"] = f"{e}"

                    publicacion.etiquetas.clear()

                    for tag in tags:
                        try:
                            nombre = tag["nombre"]
                            etiqueta = Etiqueta(nombre=nombre)
                            etiqueta.save()
                            publicacion.etiquetas.add(etiqueta)
                        except Exception as e:
                            errors["server_error_tags"] = f"{e}"

                    data = {"status": "success"}

    if not request.FILES:
        errors["no_photo"] = "Debes subir al menos una foto."
        
    
    if len(errors) != 0:
        data = {
            "status": "error",
            "errors": errors,
        }


    return JsonResponse(data)  


#social
@csrf_exempt
def likePost(request):
    data = {"status":"error"}

    if request.method == "POST":
        post_data = json.loads(request.body.decode('utf-8'))

        post_id = post_data.get("post")

        post = Publicacion.objects.get(pk=post_id)

        if post:

            perfil = getPerfilRequest(request)

            if perfil:

                existing_like = MeGusta.objects.filter(usuario=perfil, publicacion=post)
                
                if existing_like.exists():
                    existing_like.delete()
                    data = {"status": "success","action":"unliked"}
                    Notificacion.objects.filter(publicacion=post, perfil_emisor=perfil, perfil_receptor=post.autor, action="l").delete()


                else:
                    like = MeGusta(usuario=perfil,publicacion=post)
                    like.save()
                    Notificacion.objects.create(publicacion=post, perfil_emisor=perfil, perfil_receptor=post.autor, action="l")

                    data = {"status": "success","action":"liked"}

    return JsonResponse(data)  

@csrf_exempt
def commentPost(request):
    data = {"status":"error"}

    if request.method == "POST":

        post_data = json.loads(request.body.decode('utf-8'))

        post_id = post_data.get("post")

        post = Publicacion.objects.get(pk=post_id)

        if post:
            perfil = getPerfilRequest(request)
            if perfil:
                cont_comentario = post_data.get("comentario")
                if cont_comentario and len(cont_comentario) > 0:
                    comentario = Comentario(publicacion = post, autor=perfil,texto=cont_comentario)
                    comentario.save()
                    

                    comment = {
                            "pic":perfil.foto_perfil.url,
                            "username":perfil.usuario.username,
                            "content":cont_comentario
                    }

                    data = {
                        "status":"success",
                        "comment":comment,
                        }

    return JsonResponse(data)  


@csrf_exempt
def follow(request):
    
    data = {"status":"error"}

    if request.method == "POST":

        perfil_data = json.loads(request.body.decode('utf-8'))

        perfil_username = perfil_data["profile"]

        try:

            usuario = Usuario.objects.get(username=perfil_username)
            perfil = PerfilUsuario.objects.get(usuario=usuario)
            
        except Usuario.DoesNotExist:
            return JsonResponse(data) 
        except PerfilUsuario.DoesNotExist:
            return JsonResponse(data) 
        
        if perfil:

            current_user_profile = getPerfilRequest(request)

            if current_user_profile:

                existing_follow = Seguidor.objects.filter(seguidor=current_user_profile, siguiendo=perfil)
                
                
                if existing_follow.exists():
                    existing_follow.delete()
                    Notificacion.objects.filter(perfil_emisor=current_user_profile, perfil_receptor=perfil,action="f").delete()

                    data = {"status": "success","action":"unfollowed"}

                else:
                    seguidor = Seguidor(seguidor=current_user_profile, siguiendo=perfil)
                    seguidor.save()
                    Notificacion.objects.create(perfil_emisor=current_user_profile, perfil_receptor=perfil,action="f")
                    data = {"status": "success","action":"followed"}

    return JsonResponse(data)  

def obtener_publicaciones(perfil):
    publicaciones = []

    if(perfil):
        posts = Publicacion.objects.filter(autor=perfil).order_by('-creado_en')[:10]
    else:
        posts = Publicacion.objects.filter(Q(autor__perfil_privado=False) & ~Q(ubicacion=[])).order_by('?')[:10]

    for post in posts:
        post_tags = list(post.etiquetas.all().values())
        post_photos = list(post.imagenes.all().values())

        existing_like = MeGusta.objects.filter(usuario=perfil, publicacion=post)



        try:
            likes = MeGusta.objects.filter(publicacion=post)
            likes = len(likes)

        except (SessionCookie.DoesNotExist, Usuario.DoesNotExist):
            likes = 0

        publicacion = {
            "id": post.pk,
            "autor": post.autor.usuario.username,
            'descripcion': post.descripcion,
            'ubicacion': post.ubicacion,
            'etiquetas': post_tags,
            'imagenes': post_photos,
            "likes": likes,
            "liked_by_user": existing_like.exists(),
        }
        publicaciones.append(publicacion)

    return publicaciones


@csrf_exempt
def getUserFeed(request):
    data = {"status": "error", "publicaciones": []}

    if request.method == "POST":
        perfil = getPerfilRequest(request)

        if perfil:
            seguidos = Seguidor.objects.filter(seguidor=perfil)

            if seguidos:
                for seguido in seguidos:
                    data["publicaciones"] += obtener_publicaciones(seguido.siguiendo)
                shuffle(data["publicaciones"])
                data["status"] = "success"
        else:
            perfiles_aleatorios = PerfilUsuario.objects.filter(perfil_privado=False)[:10]

            for perfil_random in perfiles_aleatorios:
                data["publicaciones"] += obtener_publicaciones(perfil_random)
            shuffle(data["publicaciones"])
            data["status"] = "success"

    return JsonResponse(data)
@csrf_exempt
def getDiscover(request):
    data = {"status": "error"}
    publicaciones=[]

    if request.method == "POST":
        
        publicaciones += obtener_publicaciones(False)
        data["status"] = "success"
        
        shuffle(publicaciones)
        data["markers"] = publicaciones

    return JsonResponse(data)


@csrf_exempt
def notifications(request):
    data = {"status": "error"}
    notificaciones =[]

    if request.method == "POST":
        perfil = getPerfilRequest(request)

        if perfil:

            notificaciones = Notificacion.objects.filter(perfil_receptor=perfil)
            new_notificaciones=[]
            for noti in notificaciones:

                newNot = {
                    "emisor":noti.perfil_emisor.usuario.username,
                    "action":noti.action,
                    "viewed":noti.vista,

                }

                new_notificaciones.append(newNot)
                noti.vista = True
                noti.save()


            
            new_notificaciones.reverse()
            data["status"] = "success"
            data["notifications"] = new_notificaciones

    return JsonResponse(data)


@csrf_exempt
def followers_list(request):

    data = {"status": "error"}
    followers =[]

    if request.method == "POST":


        perfil_data = json.loads(request.body.decode('utf-8'))

        perfil_username = perfil_data["username"]

        user = Usuario.objects.get(username=perfil_username)

        if user:

            perfil = PerfilUsuario.objects.get(usuario=user)


            if perfil:

                followers = Seguidor.objects.filter(siguiendo=perfil)
                new_followers=[]

                for follower in followers:

                    newFollower = {
                        "username":follower.seguidor.usuario.username,
                        "pic":follower.seguidor.foto_perfil.url,
                    }

                    new_followers.append(newFollower)

                data["status"] = "success"
                data["followers"] = new_followers

    return JsonResponse(data)





@csrf_exempt
def delete_comment(request,id):

    data = {"status": "error"}
 

    if request.method == "POST":


        perfil = getPerfilRequest(request)



        if perfil:

            comentario = Comentario.objects.get(pk=id)


            if comentario:

                if comentario.autor == perfil or comentario.publicacion.autor == perfil:
                    comentario.delete()
                    data["status"] = "success"


    return JsonResponse(data)

@csrf_exempt
def get_comment(request,id):

    data = {"status": "error"}

    

    if request.method == "POST":

        post = Publicacion.objects.get(pk=id)
        if post:

            comments = Comentario.objects.filter(publicacion=post)

            post_comments=[]

            for comment in comments:

                new_comment={
                    "pic":comment.autor.foto_perfil.url,
                    "username":comment.autor.usuario.username,
                    "content":comment.texto,
                    "id":comment.pk
                }

                post_comments.append(new_comment)
                
            data["comments"] = post_comments
            data["status"] = post_comments


    return JsonResponse(data)


@csrf_exempt
def edit_profile(request):

    data = {"status": "error"}
    errors={}

    if request.method == "POST":

        username = request.POST.get("username")
        biografia = request.POST.get("biografia")
        es_privado = request.POST.get("es_privado")
        
        if es_privado == "true":
            es_privado= True
        elif es_privado == "false":
            es_privado= False
        

        if len(biografia) > 500:
            errors["large_bio"] = "La biografía es demasiado larga."

        if len(username) > 15:
            errors["large_username"] = "El nombre de usuario es demasiado largo ."

        user = getUserRequest(request)

        if user.username != username and checkIfUsernameExist(username):
            errors["username_exist"] = "Vaya... ese nombre de usuarios ya existe."

        if len(errors) == 0:

            perfil = getPerfilRequest(request)

            if perfil and user:

                if not perfil.biografia == biografia:
                    perfil.biografia = biografia

                if not user.username == username:

                    past_user = user.username
                                        
                    user.username = username
                    
                    user.save()
                    
                    etiquetasAsociadas = Etiqueta.objects.filter(nombre=past_user)

                    for etiqueta in etiquetasAsociadas:
     
                        etiqueta.nombre = username
                        etiqueta.save()




                if not perfil.perfil_privado == es_privado:  
                    perfil.perfil_privado = es_privado

                perfil.save()






                data["status"] = "success"
        else:
            data["errors"] = errors

    


    return JsonResponse(data)


#envia un email para cambiar la contraseña
@csrf_exempt
def mail_change_password(request):

    data={"status":"error"}

    user = getUserRequest(request)

    fecha_hoy = datetime.now().strftime("%Y-%m-%d")

    mensaje_original = f"{user.verification_token}/{fecha_hoy}"

    f = Fernet(CLAVE_SECRETA)

    mensaje_encriptado = f.encrypt(mensaje_original.encode())


    if user:

        enlace_verificacion = f"{settings.APP_WEB_HOST}change-password/{mensaje_encriptado.decode()}/"

        asunto = "!Cambio de contraseña!"

        mensaje_html = render_to_string('email_templates/cambio_contraseña.html', {'enlace_verificacion': enlace_verificacion,'username': user.username})
        
        mensaje_texto = strip_tags(mensaje_html)

        remitente = settings.EMAIL_HOST_USER
        destinatario = [user.email]

        send_mail(
            asunto,
            mensaje_texto, 
            remitente,
            destinatario,
            html_message=mensaje_html,  
        )
        data["status"] = "success"
    return JsonResponse(data)


@csrf_exempt
def change_password(request):

    data = {"status":"error"}
    errors = {}

    if request.method == "POST":

        data_post = json.loads(request.body.decode('utf-8'))
        password = data_post.get("pass")
        rep_password = data_post.get("repeat")
        token = data_post.get("token")



        f = Fernet(CLAVE_SECRETA)
        token_bytes = token.encode()
        mensaje = f.decrypt(token_bytes)
        datos = mensaje.decode()
        token_codificado, fecha_str = datos.split("/")
        
        fecha = datetime.strptime(fecha_str, "%Y-%m-%d")
    
        caducidad = fecha + timedelta(days=2)
    
        if caducidad > datetime.now():

            usuario = Usuario.objects.get(verification_token=token_codificado)  
    
            if usuario:



                if len(password) < 5:
                    errors["short_password"] = "La contraseña debe contener al menos 5 carácteres." 

                if password != rep_password:
                    errors["different_password"] = "Los contraseñas no coinciden."

                if len(errors) == 0:
                    usuario.password = password
                    usuario.save()
                    data = {"status": "success"}
                else:
                    data["errors"] = errors
            else:
                data = {"status": "error", "mensaje": "El usuario asociado al token no existe"}
        else:
            data = {"status": "error", "mensaje": "El token ha caducado"}

    
    return JsonResponse(data)
#elimina un post
@csrf_exempt
def eliminar_post(request):
    data = {"status": "error"}

    if request.method == "POST":
        perfil = getPerfilRequest(request) 

        if perfil:
            post_data = json.loads(request.body.decode('utf-8'))

            post_id = post_data.get("post_id")


            try:
                publicacion = Publicacion.objects.get(pk=post_id)

                if publicacion.autor == perfil:    

                    deletePostImages(publicacion)

                    publicacion.etiquetas.clear()

                    publicacion.comentarios.all().delete()
                    publicacion.me_gustas.all().delete()


                    publicacion.imagenes.all().delete()
                    publicacion.delete()

                    data["status"] = "success" 


                else:
                    data["status"] = "error" 

            except Publicacion.DoesNotExist:
                data["status"] = "error" 


    return JsonResponse(data)

def deletePostImages(publicacion):

    imagenes_a_eliminar = publicacion.imagenes.all()


    for imagen in imagenes_a_eliminar:
        ruta_archivo = imagen.imagen.path

        if os.path.exists(ruta_archivo):
            os.remove(ruta_archivo)
            print(f"Archivo eliminado: {ruta_archivo}")
        else:
            print(f"El archivo no existe: {ruta_archivo}")

        imagen.delete()
