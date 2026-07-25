#!/bin/bash

docker > /dev/null 2>&1

if [ $? -ne 0 ]; then
  echo "Docker is not installed. Please install it to proceed."
  exit 1
fi

docker compose > /dev/null 2>&1

if [ $? -ne 0 ]; then
  echo "Docker Compose is not installed. Please install it to proceed."
  exit 1
fi

echo "Starting node environment..."
docker compose up node-env -d --build && docker compose attach node-env