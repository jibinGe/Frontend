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
                sh 'npm run build'
            }
        }

        // stage('Deploy') {
        //     steps {
        //         sh 'rsync -ravz build/ jenkins@13.228.104.12:/home/ubuntu/genesys/genesys'
        //     }
        // }

        stage('Deploying the build') {
            steps {
                script {
                    echo "Copying Build to another directory"
                    sh 'sudo rm -rf /home/ubuntu/genesys/genesys/build'
                    sh 'sudo cp -r /var/lib/jenkins/workspace/React-Frontend_main/build /home/ubuntu/genesys/genesys'
                    echo "Build Completed"
                }
            }
        }
    }

//     post {
//     success {
//         emailext(
//             subject: 'Jenkins Pipeline Success',
//             body: 'Your Jenkins pipeline has completed successfully.',
//             to: 'jibingtsr@gmail.com'
//         )
//     }
//     failure {
//         emailext(
//             subject: 'Jenkins Pipeline Failure',
//             body: 'Your Jenkins pipeline has failed. Please investigate.',
//             to: 'jibingtsr@gmail.com'
//         )
//     }
// }
}
