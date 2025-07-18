#!/bin/bash

pup disable-service

git pull origin main
deno install --allow-scripts

pup enable-service
