import { spawn } from 'child_process';

const debugChildProcess = require('debug')('ChildProcess');

/**
 * Spawns new child process
 * @param command
 * @param app
 * @param name
 * @returns {ChildProcess}
 */
export default (command, app, name = "Node's") => {
  console.log( process.env.PATH );
  const childProcess = spawn(command, app);
  debugChildProcess(`${name} child process spawned`);

  childProcess.stdout.on('data', data => debugChildProcess(`${name} child process stdout: ${data}`));
  childProcess.stderr.on('data', data => debugChildProcess(`${name} child process stderr: ${data}`));
  process.on('SIGINT', () => childProcess.kill('SIGHUP'));

  childProcess.on('close', (code) => {
    if (code !== 0) debugChildProcess(`${name} child process exited with code ${code}`);
  });

  return childProcess;
};
