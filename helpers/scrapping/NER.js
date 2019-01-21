import { spawn } from 'child_process';
import geocodePlace from './GeocodePlace';

export default async function spw(inputString) {
  const py = spawn('python3', ['./NER/check.py']);
  let dataString = '';

  py.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  py.stdout.on('end', async () => {
    console.log('RESULTS_OF_PARSING: ', dataString);
    dataString.split('(').map(async (loc) => {
      const loc1 = loc.replace(", 'LOC'),", '').replace('[', '').replace(", 'LOC')]", '');
      if (loc1 !== '') console.log(await geocodePlace('Украина, Краматорск, ' + loc1)); // 'Украина, Краматорск, Иртышская 9'
    });
  });

  py.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  py.stdin.write(inputString);
  py.stdin.end();
}
