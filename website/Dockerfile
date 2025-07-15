FROM node:22.16.0-alpine AS build

WORKDIR /src
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY ./src ./src
COPY ./public ./public
COPY index.html tsconfig.json ./

RUN yarn run build

FROM nginx:1.29.0-alpine AS prod

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY ./website.nginx.conf /etc/nginx/sites-enabled/website
COPY --from=build /src/dist /usr/share/nginx/html

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

