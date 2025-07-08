#!/bin/bash

# Run tests with optional pattern argument
if [ $# -eq 0 ]; then
    npm test
else
    npm test -- "$@"
fi