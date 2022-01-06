import { createConnection } from 'typeorm';
import { Patient } from './entities/Patient';
// TODO: read config from ormconfig.json and override database field

createConnection()
  .then(async (conn) => {
    const repo = conn.getRepository(Patient);

    // let patients: Patient[] = [
    //   {
    //     peso: 15,
    //     talla: 11,
    //     perimetroCefalico: 10,
    //     presionArterial: 22,
    //     id: 2,
    //     nombre: 'Test',
    //     fechaNacimiento: new Date('2022-01-07T00:04:16.264Z')
    //   },
    //   {
    //     peso: 167,
    //     talla: 6,
    //     perimetroCefalico: 20,
    //     presionArterial: 120,
    //     id: 3,
    //     nombre: 'Ariel',
    //     fechaNacimiento: new Date('2001-07-16T04:00:00.000Z'),
    //     telefono: '829-898-8989'
    //   }
    // ];

    // await repo.save(patients);

    // console.log(await repo.find());
    require('./services/Patient'); // NOTE: init patient IPC
  })
  .catch(console.log);
