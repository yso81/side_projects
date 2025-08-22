#include <stdio.h>
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
	int i;
	int max = arr[0];
	int second_max = arr[0];

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
	int my_array1[] = {31, 6, 7, 22, 17};
	int size1 = sizeof(my_array1) / sizeof(my_array1[0]);
	
	printf("{31, 6, 7, 22, 17}");
	find_second_max(my_array1, size1);

	int my_array2[] = {6, 31, 7, 22, 17};
	int size2 = sizeof(my_array2) / sizeof(my_array2[0]);

	printf("{6, 31, 7, 22, 17}");
	find_second_max(my_array2, size2);

	int my_array3[] = {30, 6, 30, 23, 17};
	int size3 = size2;

	printf("{30, 6, 30, 23, 17}");
	find_second_max(my_array3, size3);

	int my_array4[] = {23, 30, 30, 6, 17};
	int size4 = size2;

	printf("{23, 30, 30, 6, 17}");
	find_second_max(my_array4, size4);

	return (0);
}
