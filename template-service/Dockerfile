FROM node:8.6.0-alpine

RUN addgroup -S nupp && adduser -S -g nupp nupp

ENV HOME=/home/nupp

COPY . $HOME/app/

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

WORKDIR $HOME/app

RUN chown -R nupp:nupp $HOME/* /usr/local/ && \
    chmod +x /usr/local/bin/dumb-init && \
    npm cache clean --force && \
    npm install && \
    chown -R nupp:nupp $HOME/*

USER nupp

CMD ["dumb-init", "npm", "run", "dev"]
