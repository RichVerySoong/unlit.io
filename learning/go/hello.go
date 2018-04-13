package main

import (
    "fmt"
    "time"
)

func main() {
    start := time.Now()
    fmt.Println("Hello World")
    fmt.Println(time.Since(start))
}
