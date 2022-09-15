FROM node:14
WORKDIR /app
RUN npm install -g serve
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build
ENV PORT 3000
EXPOSE 3000
CMD ["serve" , "-s" , "build"]