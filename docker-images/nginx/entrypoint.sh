#!/bin/bash

cat /etc/nginx/conf.d/prometheus.conf
cat /etc/nginx/conf.d/grafana.conf

nginx -t

nginx

tail -f /dev/null
