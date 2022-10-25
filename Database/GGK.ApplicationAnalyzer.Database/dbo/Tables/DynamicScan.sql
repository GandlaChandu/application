CREATE TABLE "SecurityAnalyzer"."DynamicScan" (
    "Id"           INT              GENERATED ALWAYS AS IDENTITY NOT NULL,
    "ProjectId"    INT              NOT NULL,
    "Url"          VARCHAR (200)    NOT NULL,
    "RunById"      INT              NOT NULL,
    "StatusId"     SMALLINT         NULL,
    "IsDeleted"    BOOLEAN          NOT NULL,
    "CreatedById"  INT              NOT NULL,
    "CreatedOn"    TIMESTAMP        NOT NULL,
    "ModifiedById" INT              NULL,
    "ModifiedOn"   TIMESTAMP        NULL,
    CONSTRAINT PK_DynamicScan PRIMARY KEY ("Id"),
    CONSTRAINT FK_DynamicScan_StatusId_DynamicScanStatus_Id FOREIGN KEY ("StatusId") REFERENCES "SecurityAnalyzer"."DynamicScanStatus" ("Id")
);

