FROM node:20.8.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4001

CMD ["node", "dist/index.js"]