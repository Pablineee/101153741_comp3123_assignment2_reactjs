# Use Node.js runtime as parent image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /101153741_comp3123_assignment2_reactjs

# Copy package.json and package-lock.json into container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the application's port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]