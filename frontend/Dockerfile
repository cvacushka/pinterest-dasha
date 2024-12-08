# Stage 1: Build
FROM node:16-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код проекта
COPY . .

# Собираем проект с помощью Webpack в режиме production
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа в директорию nginx
COPY --from=build /app/build /usr/share/nginx/html

# Если у вас есть особый конфиг для Nginx, вы можете его добавить
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx в переднем плане
CMD ["nginx", "-g", "daemon off;"]