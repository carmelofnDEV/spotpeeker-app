# Generated by Django 4.2.7 on 2024-05-30 20:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_notificacion'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='grupo',
            name='administrador',
        ),
        migrations.RemoveField(
            model_name='grupo',
            name='miembros',
        ),
        migrations.RemoveField(
            model_name='miembrogrupo',
            name='grupo',
        ),
        migrations.RemoveField(
            model_name='miembrogrupo',
            name='usuario',
        ),
        migrations.DeleteModel(
            name='Amistad',
        ),
        migrations.DeleteModel(
            name='Grupo',
        ),
        migrations.DeleteModel(
            name='MiembroGrupo',
        ),
    ]