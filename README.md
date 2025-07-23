⚠️ CURRENTLY, NGINX IS NOT CONFIGURED PROPERLY
___________________________________________

1. For scaling: multiple servers + Redis PUB-SUB
docker run --name redis -p 6379:6379 -d redis 

2. LoadBalancing/K8s Ingress/SSL (routing)/sticky-sessions(cookie-based) NGINX/nginx.conf

3. Backend Docker File
4. Frontend Docker File
5. Docker-Compose File w. backend & frontend + nginx + redis (update redis address in server.ts) 

6. Run Everything: docker-compose up --build

<!-- k8s deployment -->
1. Tag & Push Dockerfile (Image) to DockerHub
<!-- Minikube : you can load images directly without pushing. -->
<!-- Alternatively, if you want to skip DockerHub and load directly into Minikube: -->
<!-- image is built inside the Minikube VM/container without needing to push to Docker Hub- -->
- eval $(minikube docker-env)
- docker build -t ws-chatapp-backend ./backend
- docker build -t ws-chatapp-frontend ./frontend

# Tag and push backend Dockerfile Image to Docker Hub 
- docker tag ws-chatapp-backend yourdockerhub/ws-chatapp-backend
- docker push yourdockerhub/ws-chatapp-backend

# Tag and push frontend Dockerfile Image to Docker Hub
- docker tag ws-chatapp-frontend yourdockerhub/ws-chatapp-frontend
- docker push yourdockerhub/ws-chatapp-frontend

<!-- could be on base folder directly -->
2. deployment.yml & service.yml : could be individually or combined (check k8s/)

<!-- start minikube k8s-cluster first -->
- brew install minikube
- minikube start

3. apply everything in one command / or for individual components:
- kubectl apply -f k8s/ (PLACE ALL YML FILES HERE)
OR
- kubectl apply -f k8s/backend/
- kubectl apply -f k8s/frontend/
- kubectl apply -f k8s/redis/

3. Access service (backend/ frontend)
- minikube service frontend-service

Thanks,
Anurag.

