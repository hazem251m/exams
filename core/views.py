import datetime
import json
from django.http import HttpResponseBadRequest, JsonResponse
from django.core.paginator import Paginator
from django.shortcuts import render
from django.db.models import Q
from core.utils import print_pdf,convert_to_arabic_numerals,get_object_or_none
from .models import *
# Create your views here.

today = datetime.date.today().strftime('%Y-%m-%d')

def home(request):
    context  = {
        'title':'الصفحة الرئيسية'
    }
    return render(request,'core/home.html',context=context)


def exams(request):
    all_exams = Exam.objects.all()
    courses = Course.objects.all()
    today = datetime.date.today().strftime('%Y-%m-%d')
    if request.method == "POST":
        exam_name = request.POST['exam_name']
        course = Course.objects.get(id = request.POST['course'])
        duration = request.POST['exam_duration']
        final_mark = request.POST['exam_final_mark']
        hard_level = request.POST['exam_level']
        exam_date = request.POST['exam_date']
        exam = Exam.objects.create(name=exam_name,course=course,duration=duration,final_mark=final_mark,time=exam_date,hard_level=hard_level,is_active=True)
        return JsonResponse({
            'exam_name':exam.name,
            'duration':exam.duration,
            'final_mark':exam.final_mark,
            'hard_level':exam.get_hard_level_display(),
            'exam_date':exam.time,
        })
    exams_pages = Paginator(all_exams, 10)
    current_page = request.GET.get('page') if request.GET.get('page') else 1
    all_exams = exams_pages.get_page(current_page)
    context = {
        'exams' : all_exams,
        'courses':courses,
        'title' : "الإختبارات",
        'today':today,
        'pages': str(exams_pages.num_pages),
        'current_page': str(current_page),
    }
    return render(request,'core/exams.html',context=context)


created_questions = set()
def questions(request):
    all_exams = Exam.objects.all()
    if request.method == "GET":
        created_questions.clear()
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        for question_data in data['data']:
            for key, value in question_data.items():
                if key not in created_questions:
                    question_obj = Question.objects.create(text=value['question'], hard_level=value['question_level'])
                    created_questions.add(key)
    context={
        'exams':all_exams,
        'title':'إضافة سؤال'
    }
    return render(request,'core/questions.html',context=context)



def questions_bank(request):
    questions = Question.objects.all()
    if request.method == "GET":
        if request.GET.getlist("type") == ['get_data']:
            question = get_object_or_none(Question, id=request.GET.get('id'))
            return JsonResponse({
            'id':question.id,
            'question' : question.text,
            'course':question.course.id,
            'hard_level':question.hard_level,
            'answers':[{'answer':answer.text,'isTrue':answer.is_correct} for answer in question.answer_set.all()],
        })
        query = request.GET.get('question')
        if query:
            questions = questions.filter(
                Q(text__icontains=query)).distinct()
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        course = Course.objects.get(id=data['data']['course'])
        question, created = Question.objects.get_or_create(text=data['data']['question'],hard_level=data['data']['question_level'],course=course)
        if not created:
            return HttpResponseBadRequest("السؤال مسجل بالفعل")
        else:
            for answer in data['data']['answers']:
                Answer.objects.create(text=answer['answer'],is_correct=answer['isTrue'],question=question)
        return JsonResponse({
            'id':question.id,
            'question' : question.text,
            'course':question.course.name,
            'hard_level':question.get_hard_level_display(),
            'added_at':convert_to_arabic_numerals(question.created_at.strftime('%Y/%m/%d'))
        })

    questions_pages = Paginator(questions, 10)
    current_page = request.GET.get('page') if request.GET.get('page') else 1
    questions = questions_pages.get_page(current_page)
    context ={
        'questions':questions,
        'title':'بنك الأسئلة',
        'pages': str(questions_pages.num_pages),
        'current_page': str(current_page),
    }
    return render(request,'core/questions_bank.html',context=context)

def blog(request):
    if request.method == "POST":
        print(request.POST)
    return render(request,'core/blog.html')


def generate_report(request,exam_id):
    today = datetime.date.today().strftime('%Y/%m/%d')
    exam = Exam.objects.get(id=exam_id)
    template = 'reports/exam_report.html'
    pdf_name = 'تقرير الدرجات'
    title = 'تقرير الدرجات'
    date = today
    context = {'exam': exam, 'date': date,
            'title': title, 'pdf_name': pdf_name}
    return print_pdf(pdf_filename=pdf_name, template=template, context=context)
