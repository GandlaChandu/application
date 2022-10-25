
CREATE TABLE "AppAnalyzer"."Client" (
    "Id"           INT              GENERATED ALWAYS AS IDENTITY NOT NULL,
    "Name"         VARCHAR (50)     NOT NULL,
    "IsDeleted"    BOOLEAN          NOT NULL,
    "CreatedById"  INT              NOT NULL,
    "CreatedOn"    TIMESTAMP        NOT NULL,
    "ModifiedById" INT              NULL,
    "ModifiedOn"   TIMESTAMP        NULL,
    CONSTRAINT PK_Client PRIMARY KEY ("Id")
);

