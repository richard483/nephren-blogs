#!/bin/sh
set -e  # Exit on error

echo "Starting environment variable substitution"

# Process all environment variables with VITE_ prefix
for i in $(printenv | grep '^VITE_'); do
    key=$(echo "$i" | cut -d '=' -f 1)
    value=$(echo "$i" | cut -d '=' -f 2-)
    
    echo "Replacing $key with $value"
    
    # Process all files including HTML
    find /usr/share/nginx/html/assets -type f \( -name '*.js' -o -name '*.css' -o -name '*.html' \) \
        -exec sed -i "s|$key|$value|g" {} +
done

echo "Environment variable substitution completed"