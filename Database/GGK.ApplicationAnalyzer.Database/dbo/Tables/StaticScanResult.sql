CREATE TABLE "CodeAnalyzer"."StaticScanResult" (
    "Id"           INT              GENERATED ALWAYS AS IDENTITY NOT NULL,
    "StaticScanId" INT              NOT NULL,
    "Key"          VARCHAR (50)     NOT NULL,
    "Severity"     VARCHAR (10)     NOT NULL,
    "Message"      TEXT             NOT NULL,
    "Type"         VARCHAR (50)     NOT NULL,
    "RuleKey"      VARCHAR (50)     NULL,
    "RuleName"     VARCHAR (50)     NULL,
    "RuleLanguage" VARCHAR (50)     NULL,
    "Component"    VARCHAR (100)    NULL,
    "LineNumber"   INT              NULL,
    "IsDeleted"    BOOLEAN          NOT NULL,
    "CreatedById"  INT              NOT NULL,
    "CreatedOn"    TIMESTAMP        NOT NULL,
    "ModifiedById" INT              NULL,
    "ModifiedOn"   TIMESTAMP        NULL,
    CONSTRAINT PK_StaticScanResult PRIMARY KEY ("Id"),
    CONSTRAINT FK_StaticScanResult_StaticScanId_StaticScan_Id FOREIGN KEY ("StaticScanId") REFERENCES "CodeAnalyzer"."StaticScan" ("Id")
);

