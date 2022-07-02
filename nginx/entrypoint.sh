#!/bin/bash

sed -i 's/${PROMETHEUS}'"/${PROMETHEUS}/g" /etc/nginx/conf.d/prometheus.conf
sed -i 's/${GRAFANA}'"/${GRAFANA}/g" /etc/nginx/conf.d/grafana.conf

cat /etc/nginx/conf.d/prometheus.conf
cat /etc/nginx/conf.d/grafana.conf

nginx -t

nginx

tail -f /dev/null
