pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'test.sh'
            }
        }
        stage('Deliver') {
            steps {
                sh 'deploy.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'kill.sh'
            }
        }
    }
}