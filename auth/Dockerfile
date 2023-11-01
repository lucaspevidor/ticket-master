FROM node:alpine

ENV PORT=3000

WORKDIR /app
COPY package.json .
RUN npm i --omit=dev
COPY . .

CMD ["npm", "start"]