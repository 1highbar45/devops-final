pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git branch: 'main', credentialsId: '1highbar45', url: 'https://github.com/1highbar45/devops-final.git'
            }
        }

        stage('Docker') {
            steps {
                withDockerRegistry(credentialsId: 'cred-docker-hub', url: '') {
                    script {
                        // Build and push image on docker hub
                        sh "docker build -t sigmaduck125/mediplus-lite"
                        sh "docker push sigmaduck125/mediplus-lite"
                    }
                }
            }
        }
        
        // stage("Deploy"){
        //     steps{
        //         sshagent(['ubuntu-server']) {
        //             // some block
        //             sh """
        //                 ssh -o StrictHostKeyChecking=no ubuntu@13.239.27.136 << 'EOF'
        //                 sudo docker service update --image sigmaduck125/mediplus-lite:latest webserver
        //             """                
        //         }            
        //     }
        // }
    }
    
    // post {
    //     always {
    //         emailext body: 'Pipeline execution completed',
    //                  subject: 'Jenkins Pipeline Status',
    //                  to: 'your-email@example.com'
            
    //         sh 'docker logout'
    //         cleanWs()
    //     }
    // }
}