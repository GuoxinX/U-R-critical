# create image based on node from dockerhub
FROM node:lts-alpine as node

# add npm proxy
# RUN npm config set https-proxy http://wwwproxy.unimelb.edu.au:8000

# create a dir where app will run
RUN mkdir -p /usr/src/ng-app

# set the working dir
WORKDIR /usr/src/ng-app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json /usr/src/ng-app/

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory
COPY . /usr/src/ng-app

# build app for production with minification
RUN npm run build -- --prod

EXPOSE 80 443

# create image based on the official nginx and host the vue application
FROM nginx:stable-alpine as nginx
COPY --from=node /usr/src/ng-app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /usr/share/nginx/ssl
COPY ./certificate.crt /usr/share/nginx/ssl
COPY ./private.key /usr/share/nginx/ssl
CMD [ "nginx", "-g", "daemon off;" ]
