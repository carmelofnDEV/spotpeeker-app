from django.db import models
from django.contrib.auth.models import User

class PerfilUsuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    foto_perfil = models.ImageField(upload_to='fotos_perfil/', blank=True, null=True)
    biografia = models.TextField(blank=True)
    ubicacion = models.CharField(max_length=100, blank=True)
    perfil_privado = models.BooleanField(default=True)
    premium = models.BooleanField(default=False)

class Etiqueta(models.Model):
    nombre = models.CharField(max_length=50)


class Publicacion(models.Model):
    autor = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE)
    imagenes = models.ImageField(upload_to='imagenes_publicacion/')
    texto = models.TextField(blank=True)
    ubicacion = models.CharField(max_length=100)
    etiquetas = models.ManyToManyField(Etiqueta, related_name='publicaciones')
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