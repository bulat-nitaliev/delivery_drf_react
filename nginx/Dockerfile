FROM nginx:stable-alpine

#COPY --from=build-stage /app/dist /usr/share/nginx/html
# COPY ./client/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Открываем порты 80
# EXPOSE 80 

# # Запуск Nginx
# CMD ["nginx", "-g", "daemon off;"]
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/src/app