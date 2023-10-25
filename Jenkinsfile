pipeline {
    agent any
    stages {

        stage('Install') {
            steps {
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}
