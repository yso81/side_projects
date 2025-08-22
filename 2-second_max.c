#include <stdio.h>
#include <limits.h>
/**
 * find_second_max - Prints the second maximum value of an array.
 * @arr: Pointer to the integer array.
 * @size: The number of elements in an array.
 *
 * Description - This function prints the second largest value of an array.
 *
 * Return : void
 */

void find_second_max(int *arr, int size)
{
	if (size < 2)
	{
		printf("Array must have at least 2 integers to find a second max.");
		return;

	}

	int i;
	int max = INT_MIN;
	int second_max = INT_MIN;

	for (i = 0; i < size; i++)
	{
		if (arr[i] > max)
		{
			second_max = max;
			max = arr[i];
		}
		else if (arr[i] > second_max && arr[i] < max)
		{
			second_max = arr[i];
		}
	}
	{
		printf("The second maximum value is: %d\n", second_max);
	}
}
int main(void)
{
	int my_array1[] = {11, 6, 7, 22, 17};
	int size1 = sizeof(my_array1) / sizeof(my_array1[0]);

	printf("Test 1: ");
	find_second_max(my_array1, size1);

	return (0);
}
