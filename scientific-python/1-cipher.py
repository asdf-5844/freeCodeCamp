text = 'mrttaqrhknsw ih puggrur'
custom_key = 'happycoding'

def vigenere(message, key, direction=1):
    key_index = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    final_message = ''

    for char in message.lower():

        # Keep non-alphabet characters unchanged
        if not char.isalpha():
            final_message += char
        else:
            # Get corresponding key character based on position
            key_char = key[key_index % len(key)]
            key_index += 1

            # Shift the character by key offset (positive for encrypt, negative for decrypt)
            offset = alphabet.index(key_char)
            index = alphabet.find(char)
            new_index = (index + offset * direction) % len(alphabet)
            final_message += alphabet[new_index]
    
    return final_message

# Wrapper for encryption (direction = 1)
def encrypt(message, key):
    return vigenere(message, key)
    
# Wrapper for decryption (direction = -1)
def decrypt(message, key):
    return vigenere(message, key, -1)

print(f'\nEncrypted text: {text}')
print(f'Key: {custom_key}')
decryption = decrypt(text, custom_key)
print(f'\nDecrypted text: {decryption}\n')
