FROM python:3.10

WORKDIR /usr/src/app

COPY ./requeriments.txt ./
COPY ./spotpeeker-webserver ./

RUN apt-get update && \
    apt-get install -y python3-dev default-libmysqlclient-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
    
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requeriments.txt

EXPOSE 8000

ENTRYPOINT ["python","manage.py","runserver","0.0.0.0:8000"]

