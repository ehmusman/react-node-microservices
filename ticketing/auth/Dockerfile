FROM node:14.18.2-alpine3.13
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]