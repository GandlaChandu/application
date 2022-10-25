CREATE TABLE "AppAnalyzer"."ProjectDynamicScanDetails" (
    "Id"           INT              GENERATED ALWAYS AS IDENTITY NOT NULL,
    "ProjectId"    INT              NOT NULL,
    "Url"          VARCHAR (200)    NOT NULL,
    "Username"     VARCHAR (100)    NOT NULL,
    "Password"     VARCHAR (100)    NOT NULL,
    "IsDeleted"    BOOLEAN          NOT NULL,
    "CreatedById"  INT              NOT NULL,
    "CreatedOn"    TIMESTAMP        NOT NULL,
    "ModifiedById" INT              NULL,
    "ModifiedOn"   TIMESTAMP        NULL,
    CONSTRAINT PK_ProjectDynamicScanDetails PRIMARY KEY ("Id"),
    CONSTRAINT FK_ProjectDynamicScanDetails_ProjectId_Project_Id FOREIGN KEY ("ProjectId") REFERENCES "AppAnalyzer"."Project" ("Id")
);

