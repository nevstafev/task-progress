ARG APP_DIR=/usr/src/app

# build environment
FROM node:14-alpine as builder
ARG APP_DIR

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}
ADD . ${APP_DIR}

RUN npm i && npm run build

# deploy environment
FROM nginx:1.17-alpine
ARG APP_DIR

ENV PORT=8080 \
  BACKEND_API=http://localhost:3000

COPY --from=builder ${APP_DIR}/nginx/app.conf.template /etc/nginx/conf.d/
COPY --from=builder ${APP_DIR}/entrypoint.sh /usr/local/bin/
COPY --from=builder ${APP_DIR}/build /usr/share/nginx/html

# heroku custom stuff
COPY --from=builder ${APP_DIR}/nginx/nginx.conf /etc/nginx/


EXPOSE ${PORT}

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]