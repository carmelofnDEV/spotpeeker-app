# Generated by Django 4.2.7 on 2024-05-06 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_remove_perfilusuario_username_usuario_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='username',
            field=models.CharField(max_length=50, null=True, unique=True),
        ),
    ]