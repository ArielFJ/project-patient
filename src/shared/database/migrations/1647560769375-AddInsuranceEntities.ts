import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInsuranceEntities1647560769375 implements MigrationInterface {
    name = 'AddInsuranceEntities1647560769375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "insurance_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "insurance" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "insurance_insurance_type" ("insuranceId" integer NOT NULL, "insuranceTypeId" integer NOT NULL, PRIMARY KEY ("insuranceId", "insuranceTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5c289e83324262c9144c0010ed" ON "insurance_insurance_type" ("insuranceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_05d116e3e8e2166d20c05059f2" ON "insurance_insurance_type" ("insuranceTypeId") `);
        await queryRunner.query(`DROP INDEX "IDX_5c289e83324262c9144c0010ed"`);
        await queryRunner.query(`DROP INDEX "IDX_05d116e3e8e2166d20c05059f2"`);
        await queryRunner.query(`CREATE TABLE "temporary_insurance_insurance_type" ("insuranceId" integer NOT NULL, "insuranceTypeId" integer NOT NULL, CONSTRAINT "FK_5c289e83324262c9144c0010eda" FOREIGN KEY ("insuranceId") REFERENCES "insurance" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_05d116e3e8e2166d20c05059f23" FOREIGN KEY ("insuranceTypeId") REFERENCES "insurance_type" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("insuranceId", "insuranceTypeId"))`);
        await queryRunner.query(`INSERT INTO "temporary_insurance_insurance_type"("insuranceId", "insuranceTypeId") SELECT "insuranceId", "insuranceTypeId" FROM "insurance_insurance_type"`);
        await queryRunner.query(`DROP TABLE "insurance_insurance_type"`);
        await queryRunner.query(`ALTER TABLE "temporary_insurance_insurance_type" RENAME TO "insurance_insurance_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_5c289e83324262c9144c0010ed" ON "insurance_insurance_type" ("insuranceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_05d116e3e8e2166d20c05059f2" ON "insurance_insurance_type" ("insuranceTypeId") `);
        
        // Insert seed InsuranceType data
        await queryRunner.query(`
        INSERT INTO 
            "insurance_type"("id", "name")
        VALUES
            (0, "Full"),
            (1, "Familiar")
        `);

        // Insert seed Insurance data
        await queryRunner.query(`
        INSERT INTO
            "insurance"("id", "name") 
        VALUES
            (0, "Humano"),
            (1, "MAPFRE"),
            (2, "SEMMA"),
            (3, "SENASA")
        `);

        // Insert seed Insurance_InsuranceType data
        await queryRunner.query(`
        INSERT INTO
            "insurance_insurance_type"("insuranceId", "insuranceTypeId")
        VALUES
            ( 0 , 0 ),
            ( 0 , 1 ),
            ( 1 , 0 ),
            ( 1 , 1 ),
            ( 2 , 0 ),
            ( 2 , 1 ),
            ( 3 , 0 ),
            ( 3 , 1 )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Clean tables first
        await queryRunner.query('TRUNCATE TABLE "insurance_insurance_type"')
        await queryRunner.query('TRUNCATE TABLE "insurance"')
        await queryRunner.query('TRUNCATE TABLE "insurance_type"')

        await queryRunner.query(`DROP INDEX "IDX_05d116e3e8e2166d20c05059f2"`);
        await queryRunner.query(`DROP INDEX "IDX_5c289e83324262c9144c0010ed"`);
        await queryRunner.query(`ALTER TABLE "insurance_insurance_type" RENAME TO "temporary_insurance_insurance_type"`);
        await queryRunner.query(`CREATE TABLE "insurance_insurance_type" ("insuranceId" integer NOT NULL, "insuranceTypeId" integer NOT NULL, PRIMARY KEY ("insuranceId", "insuranceTypeId"))`);
        await queryRunner.query(`INSERT INTO "insurance_insurance_type"("insuranceId", "insuranceTypeId") SELECT "insuranceId", "insuranceTypeId" FROM "temporary_insurance_insurance_type"`);
        await queryRunner.query(`DROP TABLE "temporary_insurance_insurance_type"`);
        await queryRunner.query(`CREATE INDEX "IDX_05d116e3e8e2166d20c05059f2" ON "insurance_insurance_type" ("insuranceTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5c289e83324262c9144c0010ed" ON "insurance_insurance_type" ("insuranceId") `);
        await queryRunner.query(`DROP INDEX "IDX_05d116e3e8e2166d20c05059f2"`);
        await queryRunner.query(`DROP INDEX "IDX_5c289e83324262c9144c0010ed"`);
        await queryRunner.query(`DROP TABLE "insurance_insurance_type"`);
        await queryRunner.query(`DROP TABLE "insurance"`);
        await queryRunner.query(`DROP TABLE "insurance_type"`);
    }

}
