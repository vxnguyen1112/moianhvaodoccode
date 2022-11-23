pipeline {

  agent any
  environment {
    DOCKER_IMAGE = " vxnguyen1112/pbl6"
  }

  stages {
    // stage("Test") {
    //   agent {
    //       docker {
    //         image 'node:16-alpine'
    //         env CYPRESS_CACHE_FOLDER=/app/.cache
    //         args '-u 0:0 -v /tmp:/root/.cache'
    //       }
    //   }
    //   steps {
    //     sh "npm install"
    //     sh "./test.sh"
    //   }
    // }

    stage("build") {
      agent { node {label 'master'}}
      environment {
        DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
      }
      steps {
        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} . "
        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
        sh "docker image ls | grep ${DOCKER_IMAGE}"
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
            sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            sh "docker push ${DOCKER_IMAGE}:latest"
        }

        //clean to save disk
        sh "docker image rm ${DOCKER_IMAGE}:${DOCKER_TAG}"
        sh "docker image rm ${DOCKER_IMAGE}:latest"
      }
  
    
    }
 
  stage("deploy") {
     steps {
               sshagent(['ssh_key']) {
                 sh "ssh -o StrictHostKeyChecking=no -l root 146.190.104.63 './deploy.sh'"
                 }  
            }  
  } 
  }
  post {
    success {
      echo "SUCCESSFUL"
    }
    failure {
      echo "FAILED"
    }
  }
  }
