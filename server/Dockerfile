FROM node:16.17.0

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm install pm2 -g
RUN npm install ts-node -g 
RUN pm2 install typescript

#############
#dev
#############
# CMD ["npm", "run", "dev"]


#############
#prod
#############
CMD ["pm2", "start:prod", "src/server.ts", "--watch"]

# CMD ["pm2", "start", "ecosystem.config.js", "--env", "production", "--watch"]

# CMD ["npm", "run", "dev"]