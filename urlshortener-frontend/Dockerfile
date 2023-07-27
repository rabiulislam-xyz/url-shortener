# Stage 1: Build Next.js application
FROM node:16 AS builder

WORKDIR /app
RUN npm update -g

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM nginx:alpine
ENV NODE_ENV production
# remove existing files from nginx directory
RUN rm -rf /usr/share/nginx/html/*
# copy built assets from 'builder' stage
COPY --from=builder /app/out /usr/share/nginx/html
# add nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# expose port 80 for nginx
EXPOSE 80
# start nginx
CMD ["nginx", "-g", "daemon off;"]
