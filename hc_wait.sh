#!/bin/bash

function checkServiceByNameAndMessage() {
    name=$1
    message=$2
    docker-compose logs "$name" > "logs"
    string=$(cat logs)
    counter=0
    echo "Checking $name Service"
    while [[ "$string" != *"$message"* ]]
    do
      printf "."
      docker-compose logs "$name" > "logs"
      string=$(cat logs)
      sleep 1
      counter=$((counter+1))
      if [ $counter -eq 200 ]; then
          echo "Failed after $counter tries! Cypress tests may fail!!"
          echo "$string"
          exit 1
      fi
    done
    counter=$((counter+1))
    echo "Succeeded $name Service after $counter tries!"
}

checkServiceByNameAndMessage kong 'init_worker_by_lua'
checkServiceByNameAndMessage graphite 'ok: run: nginx'
checkServiceByNameAndMessage kong-database 'database system is ready to accept connections'
checkServiceByNameAndMessage nginx 'test is successful'
checkServiceByNameAndMessage prometheus 'Starting rule manager...'
checkServiceByNameAndMessage camera-1-service 'Tomcat started on port(s): 8080'
checkServiceByNameAndMessage camera-2-service 'Tomcat started on port(s): 8080'

