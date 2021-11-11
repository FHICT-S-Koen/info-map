FROM node:12

WORKDIR /app
ARG REACT_APP_AUTH0_DOMAIN=abc
ARG REACT_APP_AUTH0_CLIENT_KEY=abc
ARG REACT_APP_AUTH0_AUDIENCE=abc

COPY package*.json ./

RUN npm ci
RUN npm install -g serve

COPY . .

RUN npm run build

CMD ["serve", "-s", "build"]
