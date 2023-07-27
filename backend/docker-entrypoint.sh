#!/bin/sh

python manage.py migrate  # temporary

exec "$@"
