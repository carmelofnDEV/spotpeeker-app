from django.db import models



#comprobar y generar contraseñas de forma segura
from django.contrib.auth.hashers import make_password, check_password

class Usuario(models.Model):
    
    username = models.CharField(unique=True,max_length=50, null=True)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    verification_token = models.CharField(max_length=100, blank=True, null=True)
    email_verified = models.BooleanField(default=False)



    def save(self, *args, **kwargs):
        if self.pk is None:  
            self.password = make_password(self.password)
        else:
            original = Usuario.objects.get(pk=self.pk)
            if self.password != original.password:
                self.password = make_password(self.password)
        super(Usuario, self).save(*args, **kwargs)

    def verify_password(self, password):
        return check_password(password, self.password)
    


class SessionCookie(models.Model):
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    value = models.CharField(max_length=255, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    


class PerfilUsuario(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    foto_perfil = models.ImageField(upload_to='pics_profile/', default="pics_profile/default.png",blank=True, null=True)
    aka = models.CharField(max_length=50,blank=True,null=True)
    biografia = models.TextField(blank=True)
    perfil_privado = models.BooleanField(default=False)
    premium = models.BooleanField(default=False)
    

class Etiqueta(models.Model):
    nombre = models.CharField(max_length=50)

class Imagen(models.Model):
    imagen = models.ImageField(upload_to='fotos-publicaciones/')

class Publicacion(models.Model):
    autor = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE)
    imagenes = models.ManyToManyField(Imagen, null=True,related_name='imagenes_publicacion')
    descripcion = models.TextField(blank=True)
    ubicacion = models.CharField(max_length=100)
    etiquetas = models.ManyToManyField(Etiqueta, related_name='etiquetas_publicacion')
    creado_en = models.DateTimeField(auto_now_add=True)



class Comentario(models.Model):
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE, related_name='comentarios')
    autor = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE)
    texto = models.TextField()
    creado_en = models.DateTimeField(auto_now_add=True)

class MeGusta(models.Model):
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE, related_name='me_gustas')
    usuario = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE)
    creado_en = models.DateTimeField(auto_now_add=True)

class Seguidor(models.Model):
    seguidor = models.ForeignKey(PerfilUsuario, related_name='seguidores', on_delete=models.CASCADE)
    siguiendo = models.ForeignKey(PerfilUsuario, related_name='siguiendo', on_delete=models.CASCADE)
    creado_en = models.DateTimeField(auto_now_add=True)


class Amistad(models.Model):
    usuario1 = models.ForeignKey(PerfilUsuario, related_name='amistades_usuario1', on_delete=models.CASCADE)
    usuario2 = models.ForeignKey(PerfilUsuario, related_name='amistades_usuario2', on_delete=models.CASCADE)
    creado_en = models.DateTimeField(auto_now_add=True)


class Grupo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    administrador = models.ForeignKey(PerfilUsuario, related_name='grupos_administrados', on_delete=models.CASCADE)
    miembros = models.ManyToManyField(PerfilUsuario, related_name='grupos')
    creado_en = models.DateTimeField(auto_now_add=True)

class MiembroGrupo(models.Model):
    grupo = models.ForeignKey(Grupo, related_name='miembros_grupo', on_delete=models.CASCADE)
    usuario = models.ForeignKey(PerfilUsuario, related_name='grupos_usuarios', on_delete=models.CASCADE)
    es_administrador = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now_add=True)

