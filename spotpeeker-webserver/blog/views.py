from django.shortcuts import render
from django.http import JsonResponse

def test(request):
    data = {
        'message': '¡Hola mundo!, el servidor va al pelo.',
        'status': 'success'
    }
    
    return JsonResponse(data)


def index(request):
    print("hola")

    return render(request, 'index.html')