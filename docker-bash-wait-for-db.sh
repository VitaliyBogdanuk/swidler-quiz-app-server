#!/bin/sh

until pg_isready -h db -p 5432; do
  echo "Waiting for database to be ready..."
  sleep 2
done
