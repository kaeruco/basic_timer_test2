from django.shortcuts import render

def post_list(request):
    return render(request, 'blog/post_list.html', {})

def basic_timer(request):
    return render(request, 'timer/basic_timer.html', {})