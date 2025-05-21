#!/bin/bash

# Print Node and npm versions
echo "Node version:"
node -v
echo "NPM version:"
npm -v

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# List the contents of the dist directory
echo "Contents of dist directory:"
ls -la dist/frontend 