# build stage
FROM node:latest as build-phat
WORKDIR /app
COPY . .
RUN npm install  ## các bạn có thể dùng yarn install .... tuỳ nhu cầu nhé
RUN npm rebuild node-sass
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-phat /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]