# Generated by Django 4.2.7 on 2024-05-06 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_sessioncookie'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='perfilusuario',
            name='username',
        ),
        migrations.AddField(
            model_name='usuario',
            name='username',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
