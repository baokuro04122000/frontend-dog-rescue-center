FROM node:19 as build

WORKDIR /usr/src/frontend

COPY package.json ./


RUN npm install npm@9.4.2 -g
RUN npm config set strict-ssl false
RUN npm config set registry https://registry.npmjs.org/
RUN npm install
RUN npm install -g typescript

RUN npm run build

FROM nginx:1.23-alpine

COPY --from=build /usr/src/frontend/build /usr/share/nginx/html

COPY --from=build /usr/src/frontend/nginx.conf /etc/nginx/conf.d/default.conf
