#include <iostream>
#include <ctime>

int main() {
  using namespace std;
  clock_t begin = clock();
  std::cout << "Hello World!" << std::endl;
  clock_t end = clock();
  std::cout << (double(end - begin) / CLOCKS_PER_SEC) << std::endl;
  return 0;
}
