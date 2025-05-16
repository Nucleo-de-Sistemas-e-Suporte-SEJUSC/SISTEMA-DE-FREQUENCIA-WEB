# Etapa 1: build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: serve os arquivos estáticos
FROM nginx:alpine

# Remove o conteúdo default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos buildados da etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80 para acessar
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
