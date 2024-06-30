#!/bin/bash
GITHUB_RUN_ID=${GITHUB_RUN_ID:-123}

function checkServiceByNameAndMessage() {
    name=$1
    message=$2
    docker-compose -p "${GITHUB_RUN_ID}" logs "$name" > "logs"
    string=$(cat logs)
    counter=0
    echo "Project $GITHUB_RUN_ID"
    echo -n "Starting service $name "
    while [[ "$string" != *"$message"* ]]
    do
      echo -e -n "\e[93m-\e[39m"
      docker-compose -p "${GITHUB_RUN_ID}" logs "$name" > "logs"
      string=$(cat logs)
      sleep 1
      counter=$((counter+1))
      if [ $counter -eq 200 ]; then
          echo -e "\e[91mFailed after $counter tries! Cypress tests may fail!!\e[39m"
          echo "$string"
          exit 1
      fi
    done
    counter=$((counter+1))
    echo -e "\e[92m Succeeded starting $name Service after $counter tries!\e[39m"
}

checkServiceByNameAndMessage grafana 'Usage stats are ready to report'
checkServiceByNameAndMessage kong 'init_worker_by_lua'
checkServiceByNameAndMessage graphite 'ok: run: nginx'
checkServiceByNameAndMessage openldap 'slapd starting'
checkServiceByNameAndMessage kong-database 'database system is ready to accept connections'
checkServiceByNameAndMessage nginx 'test is successful'
checkServiceByNameAndMessage prometheus 'Starting rule manager...'
checkServiceByNameAndMessage camera-1-service 'Tomcat started'
checkServiceByNameAndMessage camera-2-service 'Tomcat started'
checkServiceByNameAndMessage camera-3-service 'Tomcat started'
checkServiceByNameAndMessage camera-4-service 'Tomcat started'
checkServiceByNameAndMessage camera-5-service 'Tomcat started'
