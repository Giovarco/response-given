# BASE IMAGE
FROM node:8-alpine

# DEPENDENCIES
ADD package.json .
RUN npm install

# TYPESCRIPT TO JAVASCRIPT
ADD js-src js-src

# EXECUTE
CMD node ./js-src/index.js