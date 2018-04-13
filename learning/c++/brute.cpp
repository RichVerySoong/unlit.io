#include <iostream>

using namespace std;

void brute() {
  for (int i = 0; i < 26; ++i) {
    for (int j = 0; j < 26; ++j) {
      for (int k = 0; k < 26; ++k) {
        for (int m = 0; m < 26; ++m) {
          for (int n = 0; n < 26; ++n) {
            for (int p = 0; p < 10; ++p) {
              cout << i << j << k << m << n << p << endl;
            }
          }
        }
      }
    }
  }          
}

int main() {
  brute();
}
