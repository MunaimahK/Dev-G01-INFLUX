FROM node:21

WORKDIR /Users/csmaj/Desktop/MK/Influx/G01-INFLUX

COPY package.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]