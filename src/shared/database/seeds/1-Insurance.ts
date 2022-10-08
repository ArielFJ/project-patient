import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Insurance } from '../entities/Insurance';
import { InsuranceType } from '../entities/InsuranceType';

const insuranceTypes: InsuranceType[] = [
  { id: 1, name: 'Estándar' },
  { id: 2, name: 'Full' }
];

const insurances: Insurance[] = [
  {
    id: 1,
    name: 'ARS Humano',
    types: [insuranceTypes[0], insuranceTypes[1]]
  },
  {
    id: 2,
    name: 'ARS Yuna',
    types: [insuranceTypes[0]]
  },
  {
    id: 3,
    name: 'SENASA',
    types: [insuranceTypes[0], insuranceTypes[1]]
  },
];

export default class InsuranceSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const insuranceTypeRepo = connection.getRepository(InsuranceType);
    const insuranceRepo = connection.getRepository(Insurance);
    
    if (await insuranceTypeRepo.count() === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(InsuranceType)
        .values(insuranceTypes)
        .execute();
    }

    if (await insuranceRepo.count() === 0) {
      await insuranceRepo.save(insurances);
    }
  }
}
