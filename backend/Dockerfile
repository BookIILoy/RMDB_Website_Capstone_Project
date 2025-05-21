FROM python:3.10.3-alpine

WORKDIR /code

ENV PYTHONUNBUFFERED=1

RUN pip install django djangorestframework pandas pymongo django-cors-headers numpy requests

COPY . .

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
