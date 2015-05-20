FROM debian:jessie
MAINTAINER Sebastien Dumetz <s.dumetz@holusion.com>

RUN apt-get update \
 && apt-get install -y --force-yes --no-install-recommends\
      nodejs \
      nodejs-legacy \
      npm \
      apt-transport-https \
      build-essential \
      curl \
      ca-certificates \
      git \
      lsb-release \
      python-all \
      rlwrap \
 && rm -rf /var/lib/apt/lists/*;

RUN apt-get update \
 && apt-get upgrade -y --force-yes \
 && rm -rf /var/lib/apt/lists/*;

ENV node /usr/bin/nodejs
ENV NODE_ENV development
WORKDIR /src
# Bundle app source
COPY . /src



# Install app dependencies
RUN cd /src;npm install -g grunt-cli bower mocha; npm install



CMD ["npm","start"]


##App specifics
EXPOSE  8080
