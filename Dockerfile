FROM node:19 as build

WORKDIR /usr/src/frontend

COPY package.json ./


RUN npm install npm@9.4.1 -g
RUN npm config set legacy-peer-deps true
RUN npm install typescript -g
RUN npm install

RUN npm run build

FROM nginx:1.23-alpine

COPY --from=build /usr/src/frontend/build /usr/share/nginx/html

COPY --from=build /usr/src/frontend/nginx.conf /etc/nginx/conf.d/default.conf
