FROM node:24-alpine AS build
WORKDIR /opt/app
ADD package*.json .
RUN npm install
ADD . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /opt/app/dist /usr/share/nginx/html
COPY --from=build /opt/app/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80 443