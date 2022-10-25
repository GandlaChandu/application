CREATE TABLE "CodeAnalyzer"."StaticScanType" (
    "Id"                         INT        GENERATED ALWAYS AS IDENTITY NOT NULL,
    "StaticScanDetailsId" INT        NOT NULL,
    "StaticScanTypeId"           SMALLINT   NOT NULL,
    "IsDeleted"                  BOOLEAN    NOT NULL,
    "CreatedById"                INT        NOT NULL,
    "CreatedOn"                  TIMESTAMP  NOT NULL,
    "ModifiedById"               INT        NULL,
    "ModifiedOn"                 TIMESTAMP  NULL,
    CONSTRAINT PK_StaticScanType PRIMARY KEY ("Id"),
    CONSTRAINT FK_StaticScanType_StaticScanDetailsId_StaticScanDetails_Id FOREIGN KEY ("StaticScanDetailsId") REFERENCES "CodeAnalyzer"."StaticScanDetails" ("Id")
);

