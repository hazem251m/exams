from django.urls import path
from . import views

urlpatterns = [
path('',views.home,name='home'),
path('exams/',views.exams,name='exams'),
path('questions/',views.questions,name='questions'),
path('questions_bank/',views.questions_bank,name='questions_bank'),
path('blog/',views.blog,name='blog'),
path('generate_report/<str:exam_id>',views.generate_report,name='generate_report'),
]