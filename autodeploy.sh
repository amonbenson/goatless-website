#!/bin/bash

set -eux

PIPE_NAME="${PIPE_NAME:-./webhook/pipe}"

# Create the named pipe if it doesn't exist
if [[ ! -p "$PIPE_NAME" ]]; then
  mkfifo "$PIPE_NAME"
fi

while true; do
  echo "Waiting for trigger on pipe \"${PIPE_NAME}\"..."

  # Wait for new data in the pipe
  if read line < "$PIPE_NAME"; then
    echo "Received trigger: $line"

    # Stop running containers
    docker compose down

    # Pull latest changes
    git pull

    # Build and start containers
    docker compose build --no-cache
    docker compose up -d
  fi
done
