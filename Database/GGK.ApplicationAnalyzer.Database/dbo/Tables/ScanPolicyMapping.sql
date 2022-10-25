CREATE TABLE "SecurityAnalyzer"."ScanPolicyMapping" (
    "Id"              INT              GENERATED ALWAYS AS IDENTITY NOT NULL,
    "EntityTypeId"    SMALLINT         NOT NULL,
    "EntityId"        INT              NOT NULL,
    "ScanPolicyId"    INT              NOT NULL,
    "IsDeleted"       BOOLEAN          NOT NULL,
    "CreatedById"     INT              NOT NULL,
    "CreatedOn"       TIMESTAMP        NOT NULL,
    "ModifiedById"    INT              NULL,
    "ModifiedOn"      TIMESTAMP        NULL,
    CONSTRAINT PK_ScanPolicyMapping PRIMARY KEY ("Id"),
    CONSTRAINT FK_ScanPolicyMapping_StatusId_ScanPolicy_Id FOREIGN KEY ("ScanPolicyId") REFERENCES "SecurityAnalyzer"."ScanPolicy" ("Id")
);

