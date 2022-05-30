FROM nginx:1.22

COPY nginx.conf /etc/nginx/nginx.conf
COPY public/* /usr/share/nginx/html

EXPOSE 80
