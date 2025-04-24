    def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]  # Reverse the card number
    odd_digits = card_number_reversed[::2]    # Take every 2nd digit from the end (original odd positions)

    for digit in odd_digits:
        sum_of_odd_digits += int(digit)       # Add odd-positioned digits directly

    sum_of_even_digits = 0
    even_digits = card_number_reversed[1::2]  # Take the even-positioned digits (from reversed string)
    for digit in even_digits:
        number = int(digit) * 2               # Double the digit
        if number >= 10:                      # If result is two digits, add them together
            number = (number // 10) + (number % 10)
        sum_of_even_digits += number
    total = sum_of_odd_digits + sum_of_even_digits
    return total % 10 == 0                    # Valid if total modulo 10 equals 0

def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})  # Remove hyphens and spaces
    translated_card_number = card_number.translate(card_translation)

    if verify_card_number(translated_card_number):
        print('VALID!')
    else:
        print('INVALID!')

main()

# This is the Luhn Algorithm, an algorithm that verifies the validity of identification numbers like credit card numbers.

'''
The Luhn algorithm checks if a number is valid by doubling every second digit from the right, 
summing all digits (adjusting those over 9), 
and verifying that the total is divisible by 10.
'''
