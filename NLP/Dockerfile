# Using official python runtime base image
FROM python:3.6-alpine

RUN mkdir /NLP

# Set the application directory
WORKDIR /app/NLP

# Install our requirements.txt
ADD requirements.txt /app/NLP/requirements.txt
RUN apk update
RUN apk add libc-dev
RUN apk update && apk add --virtual build-dependencies build-base
RUN pip install -U pip
RUN pip install -r requirements.txt
RUN python3 -m spacy download xx_ent_wiki_sm

# Copy our code from the current folder to /app/NLP inside the container
ADD . /app/NLP
