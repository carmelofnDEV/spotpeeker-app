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
    path('logout/', views.logout, name='logout'),
    path('verify-email/<str:token>/', views.verify_mail, name='mail_verify'),
    path('verify-cookie/', views.verify_session_cookie, name='mail_verify'),


    #getUser
    path('getUser/', views.getUserData, name='getuser'),

    #getUserProfile
    path('getUserProfile/<str:username>', views.getUserProfileData, name='getuser'),

    path('upload-pic_profile/', views.uploadPicProfile, name='uploadPicProfile'),

    path('publicar-post/', views.uploadPost, name='uploadPost'),

    #social
    path('like-post/', views.likePost, name='likePost'),
    path('comment-post/', views.commentPost, name='commentPost'),
    path('follow/', views.follow, name='follow'),

    #feed
    path('user_feed/', views.getUserFeed, name='userFeed'),
    path('discover/', views.getDiscover, name='discover'),


]
