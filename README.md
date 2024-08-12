# Goatless Website

![example workflow](https://github.com/amonbenson/goatless-website/actions/workflows/lint.yml/badge.svg)

## Installation

### Node.js

Install the latest LTS release of Node.js (currently version 20). If you don't have Node.js installed, I'd recommend using [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

On Linux, run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

On Windows, download the latest _nvm-setup.exe_ from the [nvm-windows releases page](https://github.com/coreybutler/nvm-windows/releases) and run the installer. Then, open a new command prompt and run:

```powershell
nvm install --lts
nvm use --lts
```

### Yarn

Install the latest version of Yarn:

```bash
npm install --global yarn
```

_Note: you can also use any other package manager, such as npm or pnpm, but you'll need to adjust the commands accordingly._

### Project Dependencies

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/amonbenson/goatless-website.git
cd goatless-website
yarn install
```

## Development

To start the development server, run:

```bash
yarn dev
```

The website will be available at [http://localhost:3000](http://localhost:3000).

## Production

You can use [pm2](https://pm2.keymetrics.io/) to manage the production server. To install pm2, run:

```bash
yarn global add pm2
```

To build the website for production and start the server, run:

```bash
yarn build
pm2 start ecosystem.config.js --env production
```

To stop the server, run:

```bash
pm2 stop ecosystem.config.js
```

To check the server status and logs, run:

```bash
pm2 status
pm2 logs
```
