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

echo "Starting development environment..."
docker compose -f compose.e2e.yaml up products-service-tests-e2e -d --build && docker compose -f compose.e2e.yaml attach products-service-tests-e2e