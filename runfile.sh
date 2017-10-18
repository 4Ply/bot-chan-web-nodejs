#!/bin/sh

docker stop bot-chan-web-nodejs

docker run -d \
    --name bot-chan-web-mongodb \
    -v /docker_data/Bot-chan-web-nodejs/mongodb:/data/db \
    -p 27017:27017 \
    mongo

docker run -d --rm \
    --name bot-chan-web-nodejs \
    -e GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
    -e GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
    -e BOT_CHAN_API_KEY_WEB=$BOT_CHAN_API_KEY_WEB \
    -e NODE_SESSION_SECRET=$NODE_SESSION_SECRET \
    -p 3001:3000 \
    --link bot-chan-web-mongodb:mongodb \
    bot-chan-web-nodejs
