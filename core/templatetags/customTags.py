from django import template

register = template.Library()

@register.filter
def convert_to_arabic_numerals(value):
    try:
        return str(value).replace('0', '٠').replace('1', '١').replace('2', '٢').replace('3', '٣').replace('4', '٤').replace('5', '٥').replace('6', '٦').replace('7', '٧').replace('8', '٨').replace('9', '٩')
    except Exception:
        return value
@register.filter
def my_range(value):
    return [0] * value


@register.filter
def my_pages(value, total):
    value = int(value)
    total = int(total)
    if value == 1:
        end = (value + 4) if total > (value + 4) else total + 1
        return [i for i in range(value, end)]
    elif value == 2:
        end = (value + 3) if total > (value + 3) else total + 1
        return [i for i in range(1, end)]
    else:
        end = (value + 3) if total > (value + 3) else total + 1
        return [i for i in range(value - 2, end)]


@register.filter
def into_str(value):
    return str(value)


@register.filter
def into_int(value):
    return int(value)


@register.filter
def add(value, add):
    return int(value) + int(add)


@register.filter
def sub(value, add):
    return int(value) - int(add)


@register.filter
def label(value):
    value = value.capitalize().split('_')
    value = ' '.join(value)
    return value


@register.filter
def convert_to_arabic_numerals(value):
    try:
        return str(value).replace('0', '٠').replace('1', '١').replace('2', '٢').replace('3', '٣').replace('4', '٤').replace('5', '٥').replace('6', '٦').replace('7', '٧').replace('8', '٨').replace('9', '٩')
    except Exception:
        return value
    

@register.filter
def get_item_by_group_number(value, card_number):
    return value.get_item_by_card_group(card_number)

@register.filter
def join_list(value):
    return ', '.join(value)

@register.filter
def get_list_len(value):
    return len(value)

@register.filter
def remove_underscore(value):
    return value.replace('_', ' ')


@register.filter
def get_page_path(page, path):
    try:
        if '?' in path:
            final_path = '?' + path.split('?')[1]
            if 'page' in path:
                final_path = final_path.rsplit('&', 1)[0]
                final_path += f'&page={page}'
            else:
                final_path += f'&page={page}'
        else:
            final_path = f'?page={page}'
                
        return final_path
    except Exception:
        return path
    