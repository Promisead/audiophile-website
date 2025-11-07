FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npx", "convex", "dev", "--port", "3000", "--hostname", "0.0.0.0"]

EXPOSE 3000
