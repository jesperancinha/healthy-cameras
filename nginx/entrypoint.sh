#!/bin/bash

sed -i 's/${PROMETHEUS}'"/${PROMETHEUS}/g" /etc/nginx/conf.d/default.conf
sed -i 's/${GRAFANA}'"/${GRAFANA}/g" /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

nginx -t

nginx

tail -f /dev/null
