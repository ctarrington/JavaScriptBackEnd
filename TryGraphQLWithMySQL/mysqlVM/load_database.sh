#!/bin/bash

mysql -uroot -pPaSSw0rd < make_grants.sql
mysql -uroot -pPaSSw0rd < make_schema.sql

