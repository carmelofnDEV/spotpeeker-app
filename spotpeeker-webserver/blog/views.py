from django.shortcuts import render
from django.http import JsonResponse
from .models import Usuario,SessionCookie,PerfilUsuario,Publicacion,Imagen,Etiqueta
from django.shortcuts import get_object_or_404

#Comparar objetos
from django.db.models import Q

#generar cookies
import uuid

#enviar correo
from django.core.mail import send_mail

#coger variables del .env
from django.conf import settings

#trabajar con json
import json

#evita la verficación csrf 
from django.views.decorators.csrf import csrf_exempt


#generar tokens para el usuario
import hashlib

#trabajar con fechas
from datetime import datetime,timedelta
from django.utils import timezone

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
            errors["short_name"] = "El nobre debe contener al menos 3 carácteres."


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

        if len(username) > 49:
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




#verificar el email del usuario
def verify_mail(request,token):

    usuario = get_object_or_404(Usuario, verification_token=token)    
    usuario.email_verified = True
    usuario.save()

    nuevo_perfil = PerfilUsuario(
        usuario=usuario
    )
    nuevo_perfil.save()

    data = {
        "status":"success"
    }
    
    return JsonResponse(data)

#genera un token de usuario
def generate_token(str):
    bytes = str.encode('utf-8')
    hash_obj = hashlib.sha256()
    hash_obj.update(bytes)
    token = hash_obj.hexdigest()
    return token

#envia un email para verificar el correo
@csrf_exempt
def send_verify_mail(name,email,token):

    enlace_verificacion = f"{settings.APP_WEB_HOST}/verify-email/{token}/"

    asunto = "!Verifica tu correo¡"
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

#con una cookie de sesion, devuelve usuario y perfil
@csrf_exempt
def getUser(request,cookie):
    data={
        "status":"error"
    }

    session_cookie = SessionCookie.objects.filter(value=cookie)

    if session_cookie:
        user_id = session_cookie[0].user_id
        user = Usuario.objects.filter(id = user_id)
        if user:
            usuario = {
                "username":user[0].username,
                "name":user[0].name,
                "last_name":user[0].last_name,
                "email":user[0].email,
            }

            data["usuario"] = usuario
            data["status"] = "success"

            perfil = PerfilUsuario.objects.filter(usuario=user[0])
            if perfil:
                perfil_usuario = {
                    "foto_perfil":perfil[0].foto_perfil.url,
                    "aka":perfil[0].aka,
                    "biografia":perfil[0].biografia,
                    "es_privado":perfil[0].perfil_privado,
                    "es_premium":perfil[0].premium,
                }
                data["perfil"] = perfil_usuario

            publicaciones = []

            posts = Publicacion.objects.filter(autor=perfil[0])
            
            for post in posts:
                post_tags = list(post.etiquetas.all().values())
                post_photos = list(post.imagenes.all().values())
                publicacion = {
                    'descripcion':post.descripcion,
                    'ubicacion':  post.ubicacion,
                    'etiquetas': post_tags,
                    'imagenes': post_photos,
                }
                publicaciones.append(publicacion)
            data["publicaciones"] = publicaciones

            




    return JsonResponse(data)


def getPerfil(request):
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
    data={"status":"error"}

    if request.method == 'POST' and request.FILES['pic']:
        pic = request.FILES['pic']
        
        perfil = getPerfil(request)
        if perfil:
            pic.name = f"{perfil.usuario}_pic_profile"
            perfil.foto_perfil = pic
            perfil.save()
            data={"status":"success"} 






    return JsonResponse(data)


def generatePhotoName(name):
    raw_name = name.split('.')  
    extension = raw_name[-1] 
    new_name = f"{uuid.uuid4()}.{extension}"
    return new_name


 

   
@csrf_exempt
def uploadPost(request):
    data = {"status": "error"}
    errors = {}
    max_size = 10 * 1024 * 1024  # 10 MB
    allowed_types = ['image/jpeg', 'image/png','image/gif']

    if request.method == 'POST' and request.FILES:

        perfil = getPerfil(request)

        if perfil:

            
            description = request.POST.get('description', '')
            tags = request.POST.getlist('tags', [])
            coords = request.POST.get('coords', '')
            photos_list = []
            photos = request.FILES.getlist('photos')

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