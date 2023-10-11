# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Install PostgreSQL client utilities
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies in the container
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Copy the wait script
COPY docker-bash-wait-for-db.sh /usr/src/app/

# Copy the entrypoint script into the container
COPY docker-bash-entrypoint.sh /usr/src/app/

# Use the entrypoint script as the default command to run
ENTRYPOINT ["/usr/src/app/docker-bash-entrypoint.sh"]
