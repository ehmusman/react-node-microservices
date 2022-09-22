FROM node:14
WORKDIR /app
RUN yarn global add serve
COPY ./build ./build
ENV PORT 3000
EXPOSE 3000
CMD ["serve" , "-s" , "build"]