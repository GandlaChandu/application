﻿CREATE TABLE "SecurityAnalyzer"."DynamicScanStatus" (
    "Id"        SMALLINT        GENERATED ALWAYS AS IDENTITY NOT NULL,
    "Name"      VARCHAR (50)    NOT NULL,
    "IsDeleted" BOOLEAN         NOT NULL,
    CONSTRAINT PK_DynamicScanStatus PRIMARY KEY ("Id")
);

