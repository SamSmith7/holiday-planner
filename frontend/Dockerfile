
# Start from node
FROM node:8.10.0

# Get Yarn Pkg Manager
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# Build client bundle
WORKDIR /app/client
ADD ./client /app/client
RUN yarn && yarn run build

# Copy server and install deps
WORKDIR /app
ADD ./server /app
RUN mv ./client/dist .
RUN yarn

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run app.py when the container launches
CMD ["yarn", "start"]
