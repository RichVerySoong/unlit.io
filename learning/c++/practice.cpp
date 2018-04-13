#include <iostream>

using namespace std;

void hello() {
    string name;
    cout << "Please, enter your full name: ";
    getline(cin, name);
    cout << "Hello, " << name << "!\n";
}

int main() {
    hello();
    return 0;
}
