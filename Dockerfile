FROM node:lts as build

ENV HUSKY 0
ENV CYPRESS_INSTALL_BINARY 0

RUN mkdir -p /opt/app
WORKDIR /opt/app

# Create cache layer for install npm deps
COPY package.json package-lock.json /opt/app/

RUN npm ci

COPY . /opt/app

RUN npm run build

FROM nginx:stable

COPY nginx /etc/nginx
ADD docker_entrypoint.sh /usr/bin/docker_entrypoint.sh

COPY --from=build /opt/app/dist/wattx-challenge /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["/usr/bin/docker_entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
