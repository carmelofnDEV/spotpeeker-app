from django.conf.urls import *
from django.urls import path, include

from . import views


urlpatterns = [

    #testing
    path("home/",views.index,name="home"),
    path("",views.test,name="test"),

    #auth
    path('register/user/', views.register, name='register'),
    path('login/user/', views.login, name='login'),
    path('verify-email/<str:token>/', views.verify_mail, name='mail_verify'),
    path('verify-cookie/', views.verify_session_cookie, name='mail_verify'),



    

]
