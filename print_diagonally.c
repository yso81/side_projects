#include <stdio.h>

/**print @ diagonally */

int main(void) /* Print char @ diagonally in stdout */


{
	int i = 0;
	int j = 0;

	for (i = 0; i < 25; i++)
	{
		for (j = 0; j < i; j++)
		{
			if (j == i - 1)
			{
				printf("@");
			} else
			{
				printf(" ");
			}
		}
		printf("\n");
	}

	/* i++ -> i += 1 -> i = i + 1 -> ++i */
}
