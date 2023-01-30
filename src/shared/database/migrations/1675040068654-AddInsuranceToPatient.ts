import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInsuranceToPatient1675040068654 implements MigrationInterface {
  name = 'AddInsuranceToPatient1675040068654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patient" ADD "insurance" varchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop column manually
    // SQLITE limitations
  }
}
