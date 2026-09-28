import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { createRequire } from 'node:module';

const BASE_PORT = 4200;
const MAX_ATTEMPTS = 100;
const HOST = 'localhost';

function isPortFree(port) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server
      .once('error', (err) => (err.code === 'EADDRINUSE' ? resolve(false) : reject(err)))
      .once('listening', () => server.close(() => resolve(true)))
      .listen(port, HOST);
  });
}

async function findFreePort() {
  for (let port = BASE_PORT; port < BASE_PORT + MAX_ATTEMPTS; port++) {
    if (await isPortFree(port)) return port;
    console.log(`Port ${port} is already in use, trying ${port + 1}...`);
  }
  throw new Error(`No free port in range ${BASE_PORT}-${BASE_PORT + MAX_ATTEMPTS - 1}`);
}

const port = await findFreePort();
const ngBin = createRequire(import.meta.url).resolve('@angular/cli/bin/ng.js');

const child = spawn(process.execPath, [ngBin, 'serve', '--port', String(port), ...process.argv.slice(2)], {
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code ?? 0));
