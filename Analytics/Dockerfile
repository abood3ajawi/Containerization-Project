# syntax=docker/dockerfile:1

FROM python:latest

WORKDIR /app
RUN pip3 install --no-cache-dir --upgrade pip 
RUN pip3 install mysql-connector-python 
RUN pip3 install pymongo 

COPY . .

CMD [ "python3", "analytics.py"]
