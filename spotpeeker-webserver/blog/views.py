from django.shortcuts import render
from django.http import JsonResponse
from .models import Usuario,SessionCookie
from django.shortcuts import get_object_or_404

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

        usuario = Usuario.objects.filter(email=email)

        if not usuario:
            errors["not_email"] = "No existe una cuenta asociada a ese correo."
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

        if len(errors) == 0:
            verification_token = generate_token((email+name))
            new_user  = Usuario(
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


#verificar el email del usuario
def verify_mail(request,token):

    usuario = get_object_or_404(Usuario, verification_token=token)    
    usuario.email_verified = True
    usuario.save()

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
                
            

    return JsonResponse(data)

        