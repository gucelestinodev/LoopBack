FROM docker.io/library/node:18-slim
USER node
RUN mkdir -p /home/node/app
WORKDIR /app
COPY --chown=node package*.json ./
RUN npm install --production -silent
COPY --chown=node . .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD [ "node", "." ]
