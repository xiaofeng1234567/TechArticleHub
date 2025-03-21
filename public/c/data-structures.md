# Data Structures in C

Data structures are ways to organize and store data efficiently. C allows you to create custom data structures to suit your specific needs.

## Arrays

Arrays store elements of the same type in contiguous memory locations.

```c
#include <stdio.h>

int main() {
    // Declaration and initialization
    int numbers[5] = {10, 20, 30, 40, 50};
    
    // Accessing elements
    for (int i = 0; i < 5; i++) {
        printf("numbers[%d] = %d\n", i, numbers[i]);
    }
    
    return 0;
}
