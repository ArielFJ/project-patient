import { createConnection } from 'typeorm';
import { Patient } from './entities/Patient';
// TODO: read config from ormconfig.json and override database field

createConnection()
  .then(async (conn) => {
    // const repo = conn.getRepository(Patient);

    // let patients: Patient[] = [
    //   {
    //     weight: 15,
    //     height: 11,
    //     headCircunference: 10,
    //     bloodPressure: 22,
    //     id: 2,
    //     name: 'Test',
    //     birthDate: new Date('2022-01-07T00:04:16.264Z')
    //   },
    //   {
    //     weight: 167,
    //     height: 6,
    //     headCircunference: 20,
    //     bloodPressure: 120,
    //     id: 3,
    //     name: 'Ariel',
    //     birthDate: new Date('2001-07-16T04:00:00.000Z'),
    //     phone: '829-898-8989'
    //   }
    // ];

    // await repo.save(patients);
    require('./services/Patient'); // NOTE: init patient IPC
    require('./services/Consultation'); // NOTE: init consultation IPC
    require('./services/Insurance'); // NOTE: init insurance IPC
  })
  .catch(console.log);
