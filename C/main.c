#include <stdio.h>

int calculate_alphabetical_sum(const char *word); //Declare the function

int main() {
  char my_word[] = "Hello";
  int sum = calculate_alphabetical_sum(my_word);
  printf("The alphabetical sum of '%s' is: %d\n", my_word, sum); // Output: 52 (8 + 5 + 12 + 12 + 15)

  char another_word[] = "world";
    sum = calculate_alphabetical_sum(another_word);
  printf("The alphabetical sum of '%s' is: %d\n", another_word, sum); //Output: 69

  char mixed_case[] = "MiXeD";
  sum = calculate_alphabetical_sum(mixed_case);
  printf("The alphabetical sum of '%s' is: %d\n", mixed_case, sum); //Output: 43 (13 + 9 + 24 + 5 + 4)

  return 0;
}
