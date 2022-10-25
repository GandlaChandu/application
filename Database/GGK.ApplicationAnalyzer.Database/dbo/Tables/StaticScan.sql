CREATE TABLE "CodeAnalyzer"."StaticScan" (
    "Id"           INT              GENERATED ALWAYS AS IDENTITY NOT NULL,
    "ProjectStaticScanDetailsId"    INT              NOT NULL,
    "Url"          VARCHAR (200)    NOT NULL,
    "Username"     VARCHAR (100)    NULL,
    "Password"     VARCHAR (200)    NULL,
    "RunById"      INT              NOT NULL,
    "StatusId"     SMALLINT         NULL,
    "IsDeleted"    BOOLEAN          NOT NULL,
    "CreatedById"  INT              NOT NULL,
    "CreatedOn"    TIMESTAMP        NOT NULL,
    "ModifiedById" INT              NULL,
    "ModifiedOn"   TIMESTAMP        NULL,
    CONSTRAINT PK_StaticScan PRIMARY KEY ("Id"),
    CONSTRAINT FK_StaticScan_StatusId_StaticScanStatus_Id FOREIGN KEY ("StatusId") REFERENCES "CodeAnalyzer"."StaticScanStatus" ("Id")
);

