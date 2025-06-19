
FROM python:3.12-slim


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app


# install dependencies
COPY ./requirements.txt .
RUN pip install --no-cache --upgrade pip
RUN pip install --no-cache -r requirements.txt
RUN pip install --no-cache gunicorn

# copy django project
COPY . .

# run entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

EXPOSE 8000



