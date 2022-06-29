echo "-> Run bash individually - Type 'camera-servicebuild' to build the project"
camera-servicebuild() {
  echo "mvn clean package"
  mvn clean package
}
echo "-> Run bash individually - Type 'camera-servicek8s' to run the executable"
camera-servicek8s() {
  echo "Running executable > mvn k8s:resource k8s:build"
  mvn k8s:resource k8s:build
}
echo "-> Run bash individually - Type 'camera-serviceregistryk8s' to run the executable"
camera-servicek8sregistry() {
  echo "Running executable > mvn k8s:resource k8s:build k8s:push -Pregistry-k8s"
  mvn k8s:resource k8s:build k8s:push -Pregistry-k8s
}
echo "-> Run bash individually - Type 'camera-servicerun' to run the executable"
camera-servicerun() {
  echo "Running executable > mvn spring-boot:run"
  mvn spring-boot:run
}
