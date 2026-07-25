# specify the node base image with your desired version node:<version>
FROM ubuntu:latest AS os

RUN apt-get update \
    && apt-get upgrade \
    && apt-get install -y curl \
    && apt-get install libatomic1 \
    && apt-get install -y git-all \
    && apt-get autoremove


FROM os as node-env

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ENV NODE_VERSION 24.15.0

ARG HOME_DIR

WORKDIR $HOME_DIR

ENV BASH_ENV ${HOME_DIR}/.bash_env

RUN touch "${BASH_ENV}"

RUN echo "alias ls=\"ls -ahlv --color=always\"" >> $HOME_DIR/.bashrc

RUN echo '. "${BASH_ENV}"' >> $HOME_DIR/.bashrc

# Download and install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | PROFILE="${BASH_ENV}" bash

RUN echo node > .nvmrc

RUN nvm install $NODE_VERSION

RUN npm install -g npm@latest

RUN npm i -g @nestjs/cli

RUN npm install -g corepack

RUN corepack enable yarn \
    && yarn set version stable \
    && yarn install \
    && yarn config set --home enableTelemetry 0 \
    && yarn -v

ARG APP_DIR

WORKDIR $APP_DIR

CMD [ "/bin/bash" ]

FROM node-env AS products-service-development

ENV NODE_ENV development

ARG APP_DIR

ARG HOME_DIR

ENV PATH=${HOME_DIR}/.nvm/versions/node/v${NODE_VERSION}/bin:$PATH

COPY . $APP_DIR

RUN yarn
