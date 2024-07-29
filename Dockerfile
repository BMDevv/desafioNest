# Use Node.js 14 LTS as base image
FROM node:21.7.0

# Copy package.json and package-lock.json (if available) to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Compilar a aplicação
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
