FROM node

WORKDIR /app

# use yarn instead of npm
RUN npm install -g yarn

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]