FROM python:3.12.8-slim

WORKDIR /app

RUN apt-get update && apt-get install -y libgl1

COPY ./requirements.txt ./requirements.txt

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt



COPY . .

EXPOSE 8000

CMD [ "fastapi", "run", "main.py" ]