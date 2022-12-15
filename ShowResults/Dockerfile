    
FROM node:latest

WORKDIR /app

COPY ["package.json", "package-lock.json*","./"]

RUN npm install -g npm@8.19.2

COPY . .

CMD [ "node", "server.js" ]
