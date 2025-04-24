FROM nginx:alpine                        # Base image: Using the lightweight Alpine-based Nginx image
COPY . /usr/share/nginx/html            # Copies all files from current directory to Nginx's default web root
EXPOSE 80                               # Informs Docker that the container will listen on port 80
CMD ["nginx", "-g", "daemon off;"]      # Starts Nginx in the foreground (prevents container from exiting)