# Use a stable Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Rebuild native modules to match the container's environment
RUN npm rebuild

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on (optional, depending on your setup)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
