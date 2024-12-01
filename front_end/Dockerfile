# Use Node.js as the base image for building
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine

# Add inline Nginx configuration for React routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copy React build files
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
