FROM node:24-alpine AS build
WORKDIR /opt/app
ADD *.json ./
RUN npm i
ADD . .
RUN npm run generate
RUN npm run build

FROM node:24-alpine
WORKDIR /opt/app
ADD package*.json ./
RUN npm i --omit=dev
COPY --from=build /opt/app/dist /opt/app/dist
COPY --from=build /opt/app/generated /opt/app/generated
CMD ["npm", "run", "start:prod"]
EXPOSE 3000