FROM node
# Add an docker user, make work dir
RUN adduser --disabled-password --gecos "" docker && \
  echo "docker ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers && \
  mkdir -p /home/docker/login-api && \
  chown docker:docker /home/docker/login-api

ENV MONGO_DB_LOGIN_API mongodb://admin:passw0rd@169.56.164.254/users
ENV JWT_SECRET MySecret

WORKDIR /home/docker/login-api

COPY . ./

RUN npm install && npm install nodemon --global

# RUN as docker user
USER docker
CMD nodemon