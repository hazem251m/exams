import pdfkit
import os
from django.template.loader import render_to_string
from django.shortcuts import _get_queryset
from django.http import HttpResponse



def print_pdf(template, context, pdf_filename):
    html_string = render_to_string(template, context)
    options = {
        'encoding': "UTF-8", 
        'quiet': '', 
        'page-size': 'A4', 
        'margin-top': '0.2in',
        'margin-right': '0.2in',
        'margin-bottom': '0.2in',
        'margin-left': '0.2in',
        'orientation': 'landscape',
    }
    final_name = pdf_filename
    pdf_name = pdf_filename
    path_wkhtmltopdf =  r'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe'
    config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)
    bytes_array = pdfkit.PDFKit(html_string, 'string', options=options, configuration=config).to_pdf()

    # for linux
    # path_wkhtmltopdf = r'/usr/bin/wkhtmltopdf'
    # config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)
    # bytes_array = pdfkit.PDFKit(html_string, 'string', options=options).to_pdf()

    # Save Data        
    file_exists = os.path.exists(final_name)
    if file_exists:
        i = 1
        while(file_exists):
            final_name = 'report (' + str(i) + ').pdf'
            file_exists = os.path.exists(final_name)
            i += 1
    with open(final_name, 'wb') as output:
        output.write(bytes_array)
    response = HttpResponse(bytes_array, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{pdf_name}.pdf"'
    os.remove(final_name)
    return response


def get_object_or_none(klass, *args, **kwargs):
    queryset = _get_queryset(klass)
    try:
        return queryset.get(*args, **kwargs)
    except queryset.model.DoesNotExist:
        return None
    

def convert_to_english_numerals(value):
    try:
        return str(value).replace('٠', '0').replace('١', '1').replace('٢', '2').replace('٣', '3').replace('٤', '4').replace('٥', '5').replace('٦', '6').replace('٧', '7').replace('٨', '8').replace('٩', '9')
    except Exception:
        return value

def convert_to_arabic_numerals(value):
    try:
        return str(value).replace('0', '٠' ).replace('1', '١').replace('2', '٢').replace('3', '٣').replace('4', '٤').replace('5', '٥').replace('6', '٦', ).replace('7', '٧').replace('8', '٨').replace('9', '٩')
    except Exception:
        return value
