# This code calculates the square root of a number with the BISECTION METHOD
# It is the foundations of Math.sqrt in Python

def square_root_bisection(square_target, tolerance=1e-7, max_iterations=100):
    # Raise error for negative input (no real square root)
    if square_target < 0:
        raise ValueError('Square root of negative number is not defined in real numbers')

    # Handle exact known square roots
    if square_target == 1:
        root = 1
        print(f'The square root of {square_target} is 1')

    elif square_target == 0:
        root = 0
        print(f'The square root of {square_target} is 0')

    else:
        # Set initial bisection bounds
        low = 0
        high = max(1, square_target)  # Ensures correct upper bound for numbers < 1
        root = None  # Will be set once a good enough approximation is found
        
        for _ in range(max_iterations):
            mid = (low + high) / 2  # Midpoint of current interval
            square_mid = mid**2     # Square of midpoint

            # If square of mid is close enough to target, we found the root
            if abs(square_mid - square_target) < tolerance:
                root = mid
                break

            # If square of mid is less than target, root is in upper half
            elif square_mid < square_target:
                low = mid

            # If square of mid is more than target, root is in lower half
            else:
                high = mid

        # If no approximation found within max_iterations, notify user
        if root is None:
            print(f"Failed to converge within {max_iterations} iterations.")
    
        else:
            # Successful approximation of square root
            print(f'The square root of {square_target} is approximately {root}')
    
    return root  # Return the computed or known root

# Test the function with N = 16
N = 16
square_root_bisection(N)
