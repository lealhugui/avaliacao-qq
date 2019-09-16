#!/bin/bash

node ./qq_twitter_backend/Connection.js &
cd ./qq_twitter/; npm start &

wait