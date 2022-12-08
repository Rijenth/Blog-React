FROM node:14

WORKDIR /usr/src/app

# we will use yarn to install dependencies (prevent the copy of node_modules because of esbuild not compatible)
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN yarn global add vite

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]

