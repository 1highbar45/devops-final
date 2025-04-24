## Install Docker and Docker Compose on Ubuntu EC2 Instance
1. Connect to EC2 Instance:
ssh -i my-kp.pem ubuntu@13.55.226.110
2. Use root user:
sudo su
3. Update the Package Index:
sudo apt update
4. Install Required Dependencies:
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
5. Add Docker's Official GPG Key:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
6. Add Docker Repository:
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
7. Update Package Index Again:
sudo apt update
8. Install Docker:
sudo apt install -y docker-ce docker-ce-cli containerd.io
9. Verify Docker Installation:
docker --version
10. Enable Docker Service:
sudo systemctl start docker
sudo systemctl enable docker
11. Add Current User to Docker Group:
sudo usermod -aG docker ${USER}
12. Install Docker Compose:
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
13. Apply Executable Permissions:
sudo chmod +x /usr/local/bin/docker-compose
14. Verify Docker Compose Installation:
docker-compose --version
15. Run image on remote EC2 instance:
docker run -d -p 80:80 sigmaduck125/mediplus-lite
16. Delete container and image:
docker stop <container_id>
docker rm <container_id>
docker image rm <image_id>
17. Install Docker Swarm:
docker swarm init
docker service create --name myserver --replicas 2 --publish 80:80 sigmaduck125/mediplus-lite
18. Check Swarm Services:
docker service ls
19. Update image:
docker service update --image sigmaduck125/mediplus-lite myserver