#!/bin/bash

pup disable-service
killall -9 deno

git pull origin main
deno install --allow-scripts

pup enable-service
