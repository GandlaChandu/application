CREATE TABLE "AppAnalyzer"."Project" (
    "Id"           INT              GENERATED ALWAYS AS IDENTITY NOT NULL,
    "Name"         VARCHAR (50)     NOT NULL,
    "DivisionId"   INT              NOT NULL,
    "Key"          UUID             NOT NULL,
    "IsDeleted"    BOOLEAN          NOT NULL,
    "CreatedById"  INT              NOT NULL,
    "CreatedOn"    TIMESTAMP        NOT NULL,
    "ModifiedById" INT              NULL,
    "ModifiedOn"   TIMESTAMP        NULL,
    CONSTRAINT PK_Project PRIMARY KEY ("Id"),
    CONSTRAINT FK_Project_DivisionId_Division_Id FOREIGN KEY ("DivisionId") REFERENCES "AppAnalyzer"."Division" ("Id")
);

