FROM nginx

ENV runningFolder /usr/local/bin/
WORKDIR ${runningFolder}
COPY entrypoint.sh ${runningFolder}
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 8090
