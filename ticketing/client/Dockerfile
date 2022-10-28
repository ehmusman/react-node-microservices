FROM node:14.18.2-alpine3.13
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV PORT 3000
EXPOSE 3000
CMD ["npm","run", "dev"]