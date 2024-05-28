#FROM node:latest AS build
#WORKDIR /dist
#
#COPY package.json package.json
#COPY package-lock.json package-lock.json
#RUN npm ci
#
#COPY public/ public
#COPY src/ src
#RUN npm run build
#
#FROM httpd:latest
#WORKDIR /var/www/html
#COPY --from=build /build/build/ /usr/local/apache2/htdocs/
#
#

# Используем базовый образ с Apache и Node.js
FROM node:latest AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Новый образ с Apache
FROM httpd:latest

# Копируем собранные файлы из предыдущего образа в директорию Apache
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

EXPOSE 3006



