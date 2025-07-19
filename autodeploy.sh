#!/bin/bash

set -eux
set -a && source .env && set +a

WEBHOOK_PIPE="${WEBHOOK_PIPE:-./webhook/pipe}"

# Create the named pipe if it doesn't exist
if [[ ! -p "$WEBHOOK_PIPE" ]]; then
  mkfifo "$WEBHOOK_PIPE"
fi

while true; do
  echo "Waiting for trigger on pipe \"${WEBHOOK_PIPE}\"..."

  # Wait for new data in the pipe
  if read line < "$WEBHOOK_PIPE"; then
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
