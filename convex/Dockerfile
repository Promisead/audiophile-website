# Use Node.js 18 as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy all files from the convex folder into the container
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 for Render to detect
EXPOSE 3000

# Start Convex in production mode
CMD ["npx", "convex", "http-server", "--port", "3000", "--hostname", "0.0.0.0"]
