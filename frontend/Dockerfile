FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

