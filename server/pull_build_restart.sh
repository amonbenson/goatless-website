#!/bin/bash

# pup disable-service

git pull origin main

cd ../client
deno install --allow-scripts
deno run build

cd ../server
deno install --allow-scripts

# pup enable-service
pup restart all
