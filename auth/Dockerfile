FROM node:alpine

ENV PORT=3000

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

CMD ["npm", "start"]