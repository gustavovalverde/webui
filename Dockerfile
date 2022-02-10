FROM fonoster/base
LABEL maintainer="Pedro Sanders <psanders@fonoster.com>"

COPY . /scripts

RUN ./install.sh; \
  apk add --no-cache --update curl bash tini nodejs npm python3 make cmake g++; \
  chown -R fonoster /scripts; \
  npm install; \
  node_modules/.bin/next build; \
  apk del bash curl python3 make cmake g++;

USER fonoster

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
CMD [ "healthcheck" ]
