FROM node:18-slim   

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]
