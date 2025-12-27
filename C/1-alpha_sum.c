#include <stdio.h>
#include <string.h>
#include <ctype.h>

/**
 * calculate_alphabetical_sum - Calculates the sum of the alphabetical
 *                               order of characters in a string.
 * @word: The string for which to calculate the sum.
 *
 * Return: The sum of the alphabetical order of the characters, or 0 if
 *         the input is NULL.
 */
int calculate_alphabetical_sum(const char *word)
{
	int sum = 0;
	int i;

	if (word == NULL)
		return (0);

	for (i = 0; word[i] != '\0'; i++)
	{
		if (isalpha(word[i]))
		{
			if (isupper(word[i]))
				sum += word[i] - 'A' + 1;
			else
				sum += word[i] - 'a' + 1;
		}
	}

	return (sum);
}

/**
 * main - Prompts the user for input, calculates the alphabetical sum,
 *        and prints the result.
 *
 * Return: Always 0 (success).
 */
int main(void)
{
	char input_string[100];
	size_t len;
	int sum;

	printf("Enter a word or phrase: ");
	fgets(input_string, sizeof(input_string), stdin);

	len = strlen(input_string);
	if (len > 0 && input_string[len - 1] == '\n')
	{
		input_string[len - 1] = '\0';
	}

	sum = calculate_alphabetical_sum(input_string);
	printf("The alphabetical sum of '%s' is: %d\n", input_string, sum);

	return (0);
}
