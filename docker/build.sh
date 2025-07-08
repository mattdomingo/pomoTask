#!/bin/bash

# Check if image name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <image-name>"
    echo "Example: $0 pomotask"
    exit 1
fi

# Build Docker image from project root with Dockerfile in docker directory
cd "$(dirname "$0")/.."
docker build -f docker/Dockerfile -t "$1" .
