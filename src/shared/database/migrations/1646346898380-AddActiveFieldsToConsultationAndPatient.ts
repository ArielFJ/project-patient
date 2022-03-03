import {MigrationInterface, QueryRunner} from "typeorm";

export class AddActiveFieldsToConsultationAndPatient1646346898380 implements MigrationInterface {
    name = 'AddActiveFieldsToConsultationAndPatient1646346898380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_patient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "birthDate" date NOT NULL, "phone" varchar(15), "email" varchar(255), "weight" integer NOT NULL DEFAULT (0), "height" integer NOT NULL DEFAULT (0), "headCircumference" integer NOT NULL DEFAULT (0), "bloodPressure" integer NOT NULL DEFAULT (0), "isActive" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`INSERT INTO "temporary_patient"("id", "name", "birthDate", "phone", "email", "weight", "height", "headCircumference", "bloodPressure") SELECT "id", "name", "birthDate", "phone", "email", "weight", "height", "headCircumference", "bloodPressure" FROM "patient"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "patient"`);
        await queryRunner.query(`ALTER TABLE "temporary_patient" RENAME TO "patient"`);
        await queryRunner.query(`CREATE TABLE "temporary_consultation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reason" varchar NOT NULL, "date" date NOT NULL, "treatment" varchar, "diagnosis" varchar, "patientId" integer, "isActive" boolean NOT NULL DEFAULT (1), "attended" boolean NOT NULL DEFAULT (0), CONSTRAINT "FK_a410e13ba9228bf180f06a9fbaf" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_consultation"("id", "reason", "date", "treatment", "diagnosis", "patientId") SELECT "id", "reason", "date", "treatment", "diagnosis", "patientId" FROM "consultation"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "consultation"`);
        await queryRunner.query(`ALTER TABLE "temporary_consultation" RENAME TO "consultation"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultation" RENAME TO "temporary_consultation"`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS  "consultation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reason" varchar NOT NULL, "date" date NOT NULL, "treatment" varchar, "diagnosis" varchar, "patientId" integer, CONSTRAINT "FK_a410e13ba9228bf180f06a9fbaf" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "consultation"("id", "reason", "date", "treatment", "diagnosis", "patientId") SELECT "id", "reason", "date", "treatment", "diagnosis", "patientId" FROM "temporary_consultation"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "temporary_consultation"`);
        await queryRunner.query(`ALTER TABLE "patient" RENAME TO "temporary_patient"`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "patient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "birthDate" date NOT NULL, "phone" varchar(15), "email" varchar(255), "weight" integer NOT NULL DEFAULT (0), "height" integer NOT NULL DEFAULT (0), "headCircumference" integer NOT NULL DEFAULT (0), "bloodPressure" integer NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "patient"("id", "name", "birthDate", "phone", "email", "weight", "height", "headCircumference", "bloodPressure") SELECT "id", "name", "birthDate", "phone", "email", "weight", "height", "headCircumference", "bloodPressure" FROM "temporary_patient"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "temporary_patient"`);
    }

}
