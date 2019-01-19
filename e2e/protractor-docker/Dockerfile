FROM openjdk:8-jdk

RUN apt update && apt-get -qqy upgrade
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt install -qqy wget bash curl nodejs

# Install runtime dependencies
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        ca-certificates \
        bzip2 \
        libfontconfig \
        build-essential \
        curl \
        mysql-client
RUN npm install npm@latest -g
RUN npm install newman-reporter-html
RUN npm install -g protractor@5.4.0 newman
RUN npm install protractor-beautiful-reporter --save-dev
RUN webdriver-manager update

 RUN apt-get update && \
  apt-get install -y --no-install-recommends \
    chromium firefox-esr \
  && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*