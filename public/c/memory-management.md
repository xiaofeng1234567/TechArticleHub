# Memory Management in C

Memory management in C is a critical aspect of programming that requires manual allocation and deallocation of memory. Unlike high-level languages with garbage collection, C gives you direct control over memory.

## Memory Segments

A C program's memory is typically divided into several segments:

1. **Text Segment**: Contains executable instructions
2. **Initialized Data Segment**: Contains global and static variables
3. **Uninitialized Data Segment (BSS)**: Contains uninitialized globals and statics
4. **Heap**: For dynamic memory allocation
5. **Stack**: For function calls, local variables

## Dynamic Memory Allocation

C provides functions in the standard library (stdlib.h) for dynamic memory management:

1. **malloc()**: Allocates memory
2. **calloc()**: Allocates and initializes memory
3. **realloc()**: Resizes previously allocated memory
4. **free()**: Deallocates memory

### Example: malloc() and free()

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate memory for 5 integers
    int *arr = (int*) malloc(5 * sizeof(int));
    
    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    
    // Use the allocated memory
    for (int i = 0; i < 5; i++) {
        arr[i] = i * 10;
        printf("arr[%d] = %d\n", i, arr[i]);
    }
    
    // Free the allocated memory
    free(arr);
    
    // Set pointer to NULL after freeing
    arr = NULL;
    
    return 0;
}
