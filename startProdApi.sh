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

echo "Starting production environment..."
docker compose up products-service-production --build -d && docker logs -f products-service-production