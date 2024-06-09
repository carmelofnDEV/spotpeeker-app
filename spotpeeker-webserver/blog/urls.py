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
    path('verify-email/', views.verify_mail, name='mail_verify'),
    path('verify-cookie/', views.verify_session_cookie, name='mail_verify'),
    path('change-password/', views.mail_change_password, name='change-password'),
    path('change-user-password/', views.change_password, name='change-password'),




    #getUser
    path('getUser/', views.getUserData, name='getuser'),

    #getUserProfile
    path('getUserProfile/<str:username>', views.getUserProfileData, name='getuser'),

    path('upload-pic_profile/', views.uploadPicProfile, name='uploadPicProfile'),

    path('publicar-post/', views.uploadPost, name='uploadPost'),

    path('editar-post/', views.editUploadPost, name='editUploadPost'),


    #social
    path('like-post/', views.likePost, name='likePost'),
    path('comment-post/', views.commentPost, name='commentPost'),
    path('follow/', views.follow, name='follow'),
    path('delete-comment/<int:id>', views.delete_comment, name='delete-comment'),

    #feed
    path('user_feed/', views.getUserFeed, name='userFeed'),
    path('discover/', views.getDiscover, name='discover'),

    #profile
    path('notifications/', views.notifications, name='notifications'),
    path('followers-list/', views.followers_list, name='followers-list'),
    path('get-comments/<int:id>', views.get_comment, name='get-comment'),
    path('edit-profile/', views.edit_profile, name='edit-profile'),

    path('eliminar-post/', views.eliminar_post, name='eliminar-post'),





   


]
