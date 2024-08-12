import os
import requests
import subprocess
import logging
from zipfile import ZipFile
from io import BytesIO
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s: %(message)s")

GITHUB_REPOSITORY = os.getenv("GITHUB_REPOSITORY")
GITHUB_ARTIFACT = os.getenv("GITHUB_ARTIFACT")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

DEPLOY_DESTINATION = os.getenv("DEPLOY_DESTINATION")
DEPLOY_STOP_COMMAND = os.getenv("DEPLOY_STOP_COMMAND")
DEPLOY_START_COMMAND = os.getenv("DEPLOY_START_COMMAND")

def download_artifact():
    base_url = f"https://api.github.com/repos/{GITHUB_REPOSITORY}/actions/artifacts"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    # get list of artifacts
    logging.info(f"Getting artifact list from {base_url}")
    response = requests.get(base_url, headers=headers)
    response.raise_for_status()
    artifacts = response.json()["artifacts"]

    # find the artifact by name
    logging.info(f"Looking for artifact {GITHUB_ARTIFACT}")
    artifact = next((a for a in artifacts if a["name"] == GITHUB_ARTIFACT), None)
    if not artifact:
        raise ValueError(f"Artifact {GITHUB_ARTIFACT} not found")

    # download the artifact
    logging.info(f"Downloading artifact {GITHUB_ARTIFACT}")
    artifact_url = f"{base_url}/{artifact['id']}/zip"
    response = requests.get(artifact_url, headers=headers)
    response.raise_for_status()

    # extract the artifact
    logging.info(f"Extracting artifact to {DEPLOY_DESTINATION}")
    with ZipFile(BytesIO(response.content)) as zip_file:
        zip_file.extractall(DEPLOY_DESTINATION)

def stop_server():
    logging.info("Stopping server")
    subprocess.check_call(DEPLOY_STOP_COMMAND, shell=True)

def start_server():
    logging.info("Starting server")
    subprocess.check_call(DEPLOY_START_COMMAND, shell=True)

if __name__ == "__main__":
    try:
        stop_server()
        download_artifact()
    finally:
        start_server()
