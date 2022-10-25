CREATE TABLE "AppAnalyzer"."Division" (
    "Id"           INT           GENERATED ALWAYS AS IDENTITY NOT NULL,
    "Name"         VARCHAR (50) NULL,
    "ClientId"     INT           NOT NULL,
    "IsDeleted"    BOOLEAN           NOT NULL,
    "CreatedById"  INT           NOT NULL,
    "CreatedOn"    TIMESTAMP      NOT NULL,
    "ModifiedById" INT           NULL,
    "ModifiedOn"   TIMESTAMP      NULL,
    CONSTRAINT PK_Division PRIMARY KEY  ("Id"),
    CONSTRAINT FK_Division_ClientId_Client_Id FOREIGN KEY ("ClientId") REFERENCES "AppAnalyzer"."Client" ("Id")
);

