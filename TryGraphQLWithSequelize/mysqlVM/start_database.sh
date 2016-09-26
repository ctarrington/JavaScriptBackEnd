#!/bin/bash

sudo mv /etc/my.cnf /etc/my.cnf.old
sudo service mysql start
sudo mysqladmin -u root password PaSSw0rd
