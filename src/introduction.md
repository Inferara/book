# Introduction

You are reading a book about _The Inference Programming Language_. With Inference, you can write highly reliable, mission-critical programs with a high level of confidence that they will behave exactly as intended. Inference is designed from the ground up to support formal verification (FV) of program properties, allowing you to prove code correctness mathematically with machine-checked proofs of behavior without needing to learn complex mathematical theories or specialized verification tools. Inference lets you write programs and their specifications in the same language and even in the same file, much like you would do with unit tests.

## Who Inference Is For

The key power of Inference is that it has formal verification built-in from the start. Therefore, Inference is best suited for developing high assurance software. Here are some groups of people who will benefit the most from using Inference.

### Developer Teams

Inference provides a way to rigorously ensure the correctness of code through formal verification. For development teams working on mission-critical applications, this means they can obtain mathematical guarantees that specified properties of their programs always hold, rather than relying solely on testing and code review. This leads to substantially lower residual defect risk, higher quality software, increased reliability, and improved safety of its users.

Examples of such software include, but are not limited to:
- Cryptographic software and security systems
- Various vehicle control systems (e.g., automotive, aerospace, marine)
- Medical devices and healthcare software
- Design and production of chips and circuits
- Blockchain, financial systems and banking software
- Industrial automation and control systems

### Researchers

Traditionally, formal verification has been a complex and specialized field, requiring deep knowledge of mathematical theories and specialized tools. Most of the existing formal verification tools are used by experts from academia and research institutions. Inference lowers the barrier of entry for researchers and provides a unified platform for writing and verifying code, making it easier to explore new ideas and push the boundaries of what is possible with formal verification.

### Students

Students learning computer science can benefit from using Inference to gain a deeper understanding of programming languages, mathematical logic, reasoning, and formal verification concepts. By using Inference, students can learn how to write correct and reliable code from the start, developing good programming habits that will serve them well in their future careers.

### People Who Value Reliability and Safety

Inference is an excellent choice for anyone who values reliability and safety in their software. Whether you are developing software for personal use or an open source library for a larger audience, Inference provides a way to ensure that your code behaves as intended and meets the highest standards of quality and reliability.

## Who This Book Is For

This book assumes that you are already familiar with at least one programming language with systems-programming capabilities. However, **no prior knowledge of formal verification or mathematical logic is required**. The book will guide you through the key concepts of the Inference programming language and its formal verification capabilities, providing practical examples and exercises to help you learn by doing.

Common programming concepts will not be covered in depth, but sufficient explanations and examples will be provided to help you get started quickly.

New concepts and semantics specific to Inference will be explained thoroughly, with a sufficient amount of detail and examples.

## How to Use This Book

Read this book in the order it is presented, from start to finish. Each chapter builds upon the previous one and newly introduced concepts will be used in the subsequent chapters.

Additional resources and references are provided in the [appendix](./appendix/appendix.md) section for further reading and exploration.

## Source Code

The source files from which this book is generated can be found on [GitHub](https://github.com/inferara/book).
