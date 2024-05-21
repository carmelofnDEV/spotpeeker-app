# Generated by Django 4.2.7 on 2024-05-21 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_imagen_alter_perfilusuario_foto_perfil_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comentario',
            name='texto',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='publicacion',
            name='etiquetas',
            field=models.ManyToManyField(related_name='etiquetas_publicacion', to='blog.etiqueta'),
        ),
        migrations.AlterField(
            model_name='publicacion',
            name='imagenes',
            field=models.ManyToManyField(null=True, related_name='imagenes_publicacion', to='blog.imagen'),
        ),
    ]