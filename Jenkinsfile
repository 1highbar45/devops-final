pipeline {
    agent any
    
    environment {
        DOCKER_BACKEND = "your-dockerhub-username/my-server-express"
        DOCKER_FRONTEND = "your-dockerhub-username/my-client-react"
        DOCKER_PROXY = "your-dockerhub-username/my-proxy"
    }
    
    stages {
        stage('Clone') {
            steps {
                git branch: 'main', credentialsId: '1highbar45', url: 'https://github.com/1highbar45/devops-final.git'
            }
        }

        stage('Docker Build and Push') {
            steps {
                withDockerRegistry(credentialsId: 'cred-docker-hub', url: '') {
                    script {
                        // Build and push Backend
                        sh "docker build -t ${DOCKER_BACKEND}:latest -f ./my-server-express/Dockerfile ./my-server-express"
                        sh "docker push ${DOCKER_BACKEND}:latest"
                        
                        // Build and push Frontend
                        sh "docker build -t ${DOCKER_FRONTEND}:latest -f ./my-client-react/Dockerfile ./my-client-react"
                        sh "docker push ${DOCKER_FRONTEND}:latest"
                        
                        // Build and push Proxy
                        sh "docker build -t ${DOCKER_PROXY}:latest -f ./my-proxy/Dockerfile ./my-proxy"
                        sh "docker push ${DOCKER_PROXY}:latest"
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sshagent(['your-ssh-credentials']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no user@your-server << EOF
                        cd /path/to/deployment
                        echo "DB_HOST=database" > .env
                        echo "DB_PORT=3306" >> .env
                        echo "DB_USER=root" >> .env
                        echo "DB_PASSWORD=root" >> .env
                        echo "DB_NAME=my_app" >> .env
                        
                        docker-compose pull
                        docker-compose down
                        docker-compose up -d
                        EOF
                    """
                }
            }
        }
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