from email.policy import default
from operator import mod
from statistics import mode
from unicodedata import name
from django.db import models



class Course(models.Model):
    name = models.CharField(max_length = 128 , unique=True)
    def __str__(self):
        return self.name

# Create your models here.
LEVELS = (('1','سهل'),('2','متوسط'),('3','صعب'))

class Exam(models.Model):
    name = models.CharField(max_length = 128)
    duration = models.FloatField(default=0)
    final_mark = models.FloatField(default=0)
    time = models.DateField()
    hard_level = models.CharField(max_length = 2,choices = LEVELS)
    course = models.ForeignKey(Course,on_delete = models.CASCADE)
    is_active = models.BooleanField(default = False)
    def __str__(self):
        return self.name


class Question(models.Model):
    text = models.TextField(unique=True)
    course = models.ForeignKey(Course,on_delete = models.CASCADE)
    hard_level = models.CharField(max_length = 2, choices = LEVELS)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.text


class Answer(models.Model):
    text = models.TextField()
    question = models.ForeignKey(Question,on_delete = models.CASCADE)
    is_correct = models.BooleanField(default = False)
    def __str__(self):
        return self.text

class Exam_Questions(models.Model):
    exam = models.ForeignKey(Exam,on_delete = models.CASCADE)
    question = models.ForeignKey(Question,on_delete = models.CASCADE)
    def __str__(self):
        return self.exam.name
