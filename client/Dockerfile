FROM node:16.17.0

ENV PORT 3000

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./ ./


#############
#dev
#############
ENV NODE_ENV development

RUN npm run build:dev

CMD ["npm", "run", "start:dev"]


#############
#prod
#############

# ENV NODE_ENV production

# RUN npm run build:prod

# CMD ["npm", "run", "start:prod"]
