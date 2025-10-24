FROM node:22.17.0-alpine AS build

WORKDIR /src
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY ./src ./src
COPY ./public ./public
COPY index.html tsconfig.json vite.config.ts ./

RUN yarn run build

FROM nginx:1.29.2-alpine AS prod

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/*

COPY ./website.nginx.conf /etc/nginx/conf.d/website.conf
COPY --from=build /src/dist /usr/share/nginx/html

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

