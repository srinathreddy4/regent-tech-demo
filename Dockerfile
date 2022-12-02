FROM node:14-slim

WORKDIR /regent-tech-demo

COPY package*.json ./

RUN npm install

COPY . ./

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

CMD npm run start