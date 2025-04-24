pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git branch: 'main', credentialsId: '1highbar45', url: 'https://github.com/1highbar45/devops-final.git'
            }
        }

        stage('Build') {
            steps {
                withDockerRegistry(credentialsId: 'cred-docker-hub', url: '') {
                    script {
                        // Build and push image on docker hub
                        sh label: '', script: 'docker build -t sigmaduck125/mediplus-lite .'
                        sh label: '', script: 'docker push sigmaduck125/mediplus-lite'
                    }
                }
            }
        }
        
        stage("Deploy"){
            steps{
                sshagent(['ec2']) {
                    // some block
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@13.55.226.110 << 'EOF'
                        sudo docker service update --image sigmaduck125/mediplus-lite:latest myserver
                    """                
                }            
            }
        }
    }
    
    post {
        always {
            mail bcc: '', 
            body: "Build Result: ${currentBuild.currentResult}\nBuild Number: ${currentBuild.number}",, 
            cc: '', 
            from: '', 
            replyTo: '', 
            subject: 'Pipeline Result', 
            to: 'vuanh1228@gmail.com'
        } 
    }
}