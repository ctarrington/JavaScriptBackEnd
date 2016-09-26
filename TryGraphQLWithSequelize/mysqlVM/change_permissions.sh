#!/bin/bash

sudo chown -R mysql:mysql /var/lib/mysql
sudo chown -R mysql:mysql /usr/bin/mysql

sudo chgrp -R mysql /var/lib/mysql
sudo chgrp -R mysql /usr/bin/mysql
