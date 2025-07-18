#!/bin/bash

pup stop all

git pull origin main
deno install --allow-scripts

pup restart all
