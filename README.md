Install Jenkins

brew cask install minikube
minikube start
minikube start --memory 2048
minikube dashboard
minikube ip
# Use minikube docker environment
eval $(minikube docker-env)
docker build -t hw:v1 .
kubectl run hw --image=hw:v1 --port=8081
kubectl get pods
kubectl expose deployment hw --type=NodePort
minikube service hello --url
minikube stop

helm repo add gitlab https://charts.gitlab.io/
helm repo update
helm upgrade --install gitlab gitlab/gitlab \
  --timeout 600s \
  --set global.hosts.domain=jenkins \
  --set global.hosts.externalIP=127.0.0.1 \
  --set certmanager-issuer.email=kwchess@gmail.com


https://github.com/jenkinsci/helm-charts/blob/main/charts/jenkins/README.md
helm repo add jenkins https://charts.jenkins.io
helm repo update

kubectl apply -f ns.yml

https://dzone.com/articles/how-to-set-up-jenkins-on-kubernetes


helm inspect values jenkins/jenkins > values.yaml

helm install jenkins jenkins/jenkins --namespace jenkins -f custom-values.yaml 

helm install jenkins jenkins/jenkins --namespace jenkins -f values.yaml 

# Retrieve Jenkins admin password
printf $(kubectl get secret --namespace jenkins jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo




rwN4WbpTLV

1. Get your 'admin' user password by running:
  printf $(kubectl get secret --namespace jenkins jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo
2. Get the Jenkins URL to visit by running these commands in the same shell:
  export POD_NAME=$(kubectl get pods --namespace jenkins -l "app.kubernetes.io/component=jenkins-master" -l "app.kubernetes.io/instance=jenkins" -o jsonpath="{.items[0].metadata.name}")
  echo http://127.0.0.1:8080
  kubectl --namespace jenkins port-forward $POD_NAME 8080:8080

3. Login with the password from step 1 and the username: admin

4. Use Jenkins Configuration as Code by specifying configScripts in your values.yaml file, see documentation: http:///configuration-as-code and examples: https://github.com/jenkinsci/configuration-as-code-plugin/tree/master/demos

For more information on running Jenkins on Kubernetes, visit:
https://cloud.google.com/solutions/jenkins-on-container-engine
For more information about Jenkins Configuration as Code, visit:
https://jenkins.io/projects/jcasc/



kubectl create ns jenkins
kubectl apply -f pv.yml

apiVersion: v1
kind: PersistentVolume
metadata:
  name: jenkins-pv
  namespace: jenkins
spec:
  storageClassName: jenkins-pv
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 10Gi
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /data/jenkins-volume/


master:
  enableXmlConfig: false  # was true
  runAsUser: 1000         # was unset before
  fsGroup: 1000           # was unset before
  JCasC:
    enabled: true         # was false
    defaultConfig: true   # was false
  sidecars:
    configAutoReload:
      enabled: true       # was false

