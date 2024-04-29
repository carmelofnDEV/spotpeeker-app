from django.conf.urls import *
from django.urls import path, include

from . import views


urlpatterns = [
    path("test/",views.test,name="test"),

    path("home/",views.index,name="home"),
]
