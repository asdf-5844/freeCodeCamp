# Hi Guys! Today I learned about Lambda Functions in Python.

# Adds a new expense to the list with specified amount and category
def add_expense(expenses, amount, category):
    expenses.append({'amount': amount, 'category': category})

# Prints all expenses with formatted amount and category
def print_expenses(expenses):
    for expense in expenses:
        print(f'Amount: {expense["amount"]:.2f}, Category: {expense["category"]}')

# Calculates the total of all expense amounts
def total_expenses(expenses):
    return sum(expense['amount'] for expense in expenses)

# Filters expenses by category using a lambda function
# The lambda checks if each expense's category matches the given one
# Only matching expenses are returned in a new list
def filter_expenses_by_category(expenses, category):
    return list(filter(lambda expense: expense['category'] == category, expenses))

def main():
    expenses = []  # Initialize the list to store expenses
    while True:
        # Display the menu options
        print('\nExpense Tracker')
        print('1. Add an expense')
        print('2. List all expenses')
        print('3. Show total expenses')
        print('4. Filter expenses by category')
        print('5. Exit')

        choice = input('Enter your choice: ')  # Get user input for menu selection

        if choice == '1':
            try:
                amount = float(input('Enter amount: '))  # Convert input to float
            except ValueError:
                print('Invalid amount. Please enter a number.')  # Handle non-numeric input
                continue
            category = input('Enter category: ')  # Get category input
            add_expense(expenses, amount, category)  # Add the expense to the list

        elif choice == '2':
            print('\nAll Expenses:')
            print_expenses(expenses)  # List all recorded expenses

        elif choice == '3':
            print(f'\nTotal Expenses: {total_expenses(expenses):.2f}')  # Show the total spent

        elif choice == '4':
            category = input('Enter category to filter: ')  # Get category to filter by
            expenses_from_category = filter_expenses_by_category(expenses, category)
            print(f'\nExpenses for {category}:')
            print_expenses(expenses_from_category)  # Show filtered expenses

        elif choice == '5':
            print('Exiting the program.')  # Exit message
            break  # Exit the loop and program

        else:
            print('Invalid choice. Please select from 1-5.')  # Handle wrong menu input

# Run the main function if this script is executed
if __name__ == "__main__":
    main()
