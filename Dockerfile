FROM nginx:1.15.5-alpine

COPY /dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .htpasswd /etc/nginx/conf.d/.htpasswd

CMD ["nginx", "-g", "daemon off;"]