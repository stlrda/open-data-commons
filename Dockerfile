# Container for Open Data Commons Demo
FROM node:14.15.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Add and Install Dependencies
COPY package.json ./
COPY .env ./
COPY yarn.lock ./

# RUN yarn ci
RUN yarn install

# Set Env For Swagger Json
ENV SWAGGER_URL = "https://api.stldata.org/crime/openapi.json"

# Build the App for Production
COPY . ./
RUN yarn build

# Copy Built App to Nginx Webserver
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
