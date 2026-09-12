# DevOps Kubernetes Project

## 1. Project Overview

This project demonstrates the complete process of containerizing and deploying a Node.js application using Docker, Kubernetes, Amazon ECR, Amazon EKS, and AWS Fargate.

The application is first tested locally, containerized using Docker, deployed to a local Kubernetes cluster using Minikube, and then prepared for deployment on Amazon EKS using AWS Fargate.

## 2. Technologies Used

* Node.js
* Express.js
* Docker
* Kubernetes
* Minikube
* kubectl
* Amazon ECR
* Amazon EKS
* AWS Fargate
* Amazon EC2
* Git
* GitHub

## 3. Project Architecture

```text
Node.js Application
        |
        v
      Docker
        |
        v
   Docker Image
      /     \
     /       \
    v         v
Minikube    Amazon ECR
    |          |
    v          v
Local K8s   Amazon EKS
               |
               v
          AWS Fargate
               |
               v
          Application
```

## 4. Application

The application is a simple Node.js and Express application.

Application port:

```text
3000
```

Application response:

```text
DevOps Kubernetes Demo - Application is running successfully!
```

Application source code is located in:

```text
app/server.js
```

## 5. Docker Containerization

The application is containerized using the following Dockerfile:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY app/package*.json ./

RUN npm install

COPY app/server.js .

EXPOSE 3000

CMD ["node", "server.js"]
```

Build the Docker image:

```bash
docker build -t devops-k8s-app:1.0 .
```

Run the container:

```bash
docker run -d \
  --name devops-k8s-container \
  -p 3000:3000 \
  devops-k8s-app:1.0
```

Verify the application:

```bash
curl http://localhost:3000
```

## 6. Local Kubernetes Deployment

Minikube is used to create a local Kubernetes environment.

Start Minikube:

```bash
minikube start --driver=docker
```

Load the Docker image into Minikube:

```bash
minikube image load devops-k8s-app:1.0
```

Deploy the application:

```bash
kubectl apply -f deployment.yaml
```

Create the Kubernetes Service:

```bash
kubectl apply -f service.yaml
```

Check the deployment:

```bash
kubectl get deployments
```

Check the Pods:

```bash
kubectl get pods
```

Check the Service:

```bash
kubectl get service
```

The application is exposed using a Kubernetes NodePort Service.

## 7. Amazon ECR

The Docker image is pushed to Amazon Elastic Container Registry (ECR).

AWS Region:

```text
ap-south-1
```

ECR repository:

```text
k8s-app
```

Build/tag the image for ECR:

```bash
docker tag devops-k8s-app:1.0 \
048674617574.dkr.ecr.ap-south-1.amazonaws.com/k8s-app:1.0
```

Authenticate Docker with ECR:

```bash
aws ecr get-login-password --region ap-south-1 | \
docker login --username AWS --password-stdin \
048674617574.dkr.ecr.ap-south-1.amazonaws.com
```

Push the image:

```bash
docker push \
048674617574.dkr.ecr.ap-south-1.amazonaws.com/k8s-app:1.0
```

## 8. Amazon EKS

The application is deployed to Amazon Elastic Kubernetes Service (EKS).

Cluster name:

```text
k8s-devops-cluster
```

AWS Region:

```text
ap-south-1
```

The cluster was created using `eksctl` with AWS Fargate support.

## 9. AWS Fargate

AWS Fargate is used to run Kubernetes Pods without managing EC2 worker nodes.

Fargate profiles were configured for the EKS cluster.

The application Pods run on Fargate infrastructure.

Check the Pods:

```bash
kubectl get pods -o wide
```

## 10. EKS Application Deployment

The EKS application configuration is stored in:

```text
eks-deployment.yaml
```

The application uses two replicas:

```yaml
replicas: 2
```

Apply the deployment:

```bash
kubectl apply -f eks-deployment.yaml
```

Verify:

```bash
kubectl get deployment
kubectl get pods
```

The application image is pulled from Amazon ECR.

## 11. Kubernetes Service

The EKS Service configuration is stored in:

```text
eks-service.yaml
```

The Service exposes the application on port 80 and forwards traffic to the application running on port 3000.

## 12. Verification and Troubleshooting

The following Kubernetes commands were used to verify the deployment:

```bash
kubectl get nodes
kubectl get deployments
kubectl get pods
kubectl get services
kubectl get endpoints
kubectl logs deployment/k8s-app
```

The application was verified inside the Fargate Pod using Node.js:

```bash
kubectl exec -it <pod-name> -- \
node -e "require('http').get('http://localhost:3000',r=>{r.pipe(process.stdout)})"
```

Expected output:

```text
DevOps Kubernetes Demo - Application is running successfully!
```

During troubleshooting, the initial Kubernetes LoadBalancer created a Classic Load Balancer without EC2 instance targets. The issue was identified by inspecting the AWS Load Balancer configuration and Kubernetes Service endpoints.

## 13. Project Structure

```text
DevOps-Kubernetes-Project/
│
├── README.md
├── Dockerfile
│
├── app/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── deployment.yaml
├── service.yaml
├── eks-deployment.yaml
├── eks-service.yaml
│
├── screenshots/
│   ├── application.png
│   ├── docker.png
│   ├── local-kubernetes.png
│   ├── ecr.png
│   ├── eks.png
│   ├── fargate.png
│   └── eks-application.png
│
└── documentation/
    └── Project_Report.pdf
```

## 14. Screenshots

Project screenshots are stored in the `screenshots/` directory.

They demonstrate:

* Application execution
* Docker containerization
* Local Kubernetes deployment
* Amazon ECR
* Amazon EKS
* AWS Fargate
* EKS application deployment

## 15. Documentation

The detailed project report is available in:

```text
documentation/Project_Report.pdf
```

## 16. Conclusion

This project demonstrates a complete DevOps workflow for a containerized application:

```text
Application
    ↓
Docker
    ↓
Kubernetes / Minikube
    ↓
Amazon ECR
    ↓
Amazon EKS
    ↓
AWS Fargate
```

The project provides practical experience with containerization, Kubernetes deployment, container registries, cloud-based Kubernetes, serverless containers, verification, and troubleshooting.

