#!/bin/bash

lex lex.fl

gcc -Wall -Wextra -O2 lex.yy.c

./a.out < $1.json > $1_2.json

rm -f a.out lex.yy.c
