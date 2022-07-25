import {MigrationInterface, QueryRunner} from "typeorm";

export class GeneralMigration1656351984595 implements MigrationInterface {
    name = 'GeneralMigration1656351984595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "birthDate" date NOT NULL, "phone" varchar(15), "email" varchar(255), "weight" integer NOT NULL DEFAULT (0), "height" integer NOT NULL DEFAULT (0), "headCircumference" integer NOT NULL DEFAULT (0), "bloodPressure" integer NOT NULL DEFAULT (0), "isActive" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "consultation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reason" varchar NOT NULL, "date" date NOT NULL, "treatment" varchar, "diagnosis" varchar, "isActive" boolean NOT NULL DEFAULT (1), "attended" boolean NOT NULL DEFAULT (0), "patientId" integer)`);
        await queryRunner.query(`CREATE TABLE "insurance_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "insurance" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "insurance_insurance_type" ("insuranceId" integer NOT NULL, "insuranceTypeId" integer NOT NULL, PRIMARY KEY ("insuranceId", "insuranceTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5c289e83324262c9144c0010ed" ON "insurance_insurance_type" ("insuranceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_05d116e3e8e2166d20c05059f2" ON "insurance_insurance_type" ("insuranceTypeId") `);
        await queryRunner.query(`CREATE TABLE "temporary_consultation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reason" varchar NOT NULL, "date" date NOT NULL, "treatment" varchar, "diagnosis" varchar, "isActive" boolean NOT NULL DEFAULT (1), "attended" boolean NOT NULL DEFAULT (0), "patientId" integer, CONSTRAINT "FK_a410e13ba9228bf180f06a9fbaf" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_consultation"("id", "reason", "date", "treatment", "diagnosis", "isActive", "attended", "patientId") SELECT "id", "reason", "date", "treatment", "diagnosis", "isActive", "attended", "patientId" FROM "consultation"`);
        await queryRunner.query(`DROP TABLE "consultation"`);
        await queryRunner.query(`ALTER TABLE "temporary_consultation" RENAME TO "consultation"`);
        await queryRunner.query(`DROP INDEX "IDX_5c289e83324262c9144c0010ed"`);
        await queryRunner.query(`DROP INDEX "IDX_05d116e3e8e2166d20c05059f2"`);
        await queryRunner.query(`CREATE TABLE "temporary_insurance_types_insurance_type" ("insuranceId" integer NOT NULL, "insuranceTypeId" integer NOT NULL, CONSTRAINT "FK_5c289e83324262c9144c0010eda" FOREIGN KEY ("insuranceId") REFERENCES "insurance" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_05d116e3e8e2166d20c05059f23" FOREIGN KEY ("insuranceTypeId") REFERENCES "insurance_type" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("insuranceId", "insuranceTypeId"))`);
        await queryRunner.query(`INSERT INTO "temporary_insurance_types_insurance_type"("insuranceId", "insuranceTypeId") SELECT "insuranceId", "insuranceTypeId" FROM "insurance_insurance_type"`);
        await queryRunner.query(`DROP TABLE "insurance_insurance_type"`);
        await queryRunner.query(`ALTER TABLE "temporary_insurance_types_insurance_type" RENAME TO "insurance_insurance_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_5c289e83324262c9144c0010ed" ON "insurance_insurance_type" ("insuranceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_05d116e3e8e2166d20c05059f2" ON "insurance_insurance_type" ("insuranceTypeId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_05d116e3e8e2166d20c05059f2"`);
        await queryRunner.query(`DROP INDEX "IDX_5c289e83324262c9144c0010ed"`);
        await queryRunner.query(`ALTER TABLE "insurance_insurance_type" RENAME TO "temporary_insurance_types_insurance_type"`);
        await queryRunner.query(`CREATE TABLE "insurance_insurance_type" ("insuranceId" integer NOT NULL, "insuranceTypeId" integer NOT NULL, PRIMARY KEY ("insuranceId", "insuranceTypeId"))`);
        await queryRunner.query(`INSERT INTO "insurance_insurance_type"("insuranceId", "insuranceTypeId") SELECT "insuranceId", "insuranceTypeId" FROM "temporary_insurance_types_insurance_type"`);
        await queryRunner.query(`DROP TABLE "temporary_insurance_types_insurance_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_05d116e3e8e2166d20c05059f2" ON "insurance_insurance_type" ("insuranceTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5c289e83324262c9144c0010ed" ON "insurance_insurance_type" ("insuranceId") `);
        await queryRunner.query(`ALTER TABLE "consultation" RENAME TO "temporary_consultation"`);
        await queryRunner.query(`CREATE TABLE "consultation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reason" varchar NOT NULL, "date" date NOT NULL, "treatment" varchar, "diagnosis" varchar, "isActive" boolean NOT NULL DEFAULT (1), "attended" boolean NOT NULL DEFAULT (0), "patientId" integer)`);
        await queryRunner.query(`INSERT INTO "consultation"("id", "reason", "date", "treatment", "diagnosis", "isActive", "attended", "patientId") SELECT "id", "reason", "date", "treatment", "diagnosis", "isActive", "attended", "patientId" FROM "temporary_consultation"`);
        await queryRunner.query(`DROP TABLE "temporary_consultation"`);
        await queryRunner.query(`DROP INDEX "IDX_05d116e3e8e2166d20c05059f2"`);
        await queryRunner.query(`DROP INDEX "IDX_5c289e83324262c9144c0010ed"`);
        await queryRunner.query(`DROP TABLE "insurance_insurance_type"`);
        await queryRunner.query(`DROP TABLE "insurance"`);
        await queryRunner.query(`DROP TABLE "insurance_type"`);
        await queryRunner.query(`DROP TABLE "consultation"`);
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
