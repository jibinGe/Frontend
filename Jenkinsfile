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
        stage('Deploying the build') {
            steps {
                echo "Copying Build to another directory"
                sh 'sudo rm -r /home/ubuntu/genesys/genesys/build'
                sh 'sudo cp -r /var/lib/jenkins/workspace/React-Frontend_main/build /home/ubuntu/genesys/genesys/'
                echo "Build Completed"
            }
        }
    }
}
