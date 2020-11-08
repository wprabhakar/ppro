FROM node:10.8-slim
EXPOSE 7777
COPY index.js .
CMD node index.js
