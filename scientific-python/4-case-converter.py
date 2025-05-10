# This code converts pascal or camel case to snake case
def convert_to_snake_case(pascal_or_camel_cased_string):
  
    # This list comprehension adds an underscore before uppercase letters and converts them to lowercase
    snake_cased_char_list = [
        '_' + char.lower() if char.isupper()
        else char # Keep the character as is if it's not uppercase
        for char in pascal_or_camel_cased_string
    ]
    # Join the characters and remove any leading underscore with strip
    return ''.join(snake_cased_char_list).strip('_')

def main():
    print(convert_to_snake_case('IAmAPascalCasedString'))

main()
