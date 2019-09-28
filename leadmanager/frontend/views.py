from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'frontend/index.html')


def loggedin(request):
    return render(request, 'frontend/loggedin.html')
