pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        // # https://medium.com/appfleet/how-to-set-up-jenkins-on-kubernetes-70f8eac3dc7e
        git 'https://github.com/andreipope/HelloWorld'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }      
  }
}
