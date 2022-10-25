﻿CREATE TABLE "AppAnalyzer"."ScanType" (
    "Id"        SMALLINT        GENERATED ALWAYS AS IDENTITY NOT NULL,
    "Name"      VARCHAR (50)    NOT NULL,
    "IsDeleted" BOOLEAN         NOT NULL,
    CONSTRAINT PK_ScanType PRIMARY KEY ("Id")
);

