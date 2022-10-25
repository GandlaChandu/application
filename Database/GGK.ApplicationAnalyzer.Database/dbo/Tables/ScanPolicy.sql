CREATE TABLE "SecurityAnalyzer"."ScanPolicy" (
    "Id"              INT              GENERATED ALWAYS AS IDENTITY NOT NULL,
    "ScanPolicyName"  VARCHAR(200)     NOT NULL,
    "ScanPolicyCode"  UUID             NOT NULL,
    "IsDeleted"       BOOLEAN          NOT NULL,
    "CreatedById"     INT              NOT NULL,
    "CreatedOn"       TIMESTAMP        NOT NULL,
    "ModifiedById"    INT              NULL,
    "ModifiedOn"      TIMESTAMP        NULL,
    CONSTRAINT PK_ScanPolicy PRIMARY KEY ("Id")
);

