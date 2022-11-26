## Performance Result

### 1. EC2

![image](https://user-images.githubusercontent.com/64528476/203718994-6b3d4506-6188-4efe-a00d-2651614f2b2f.png)

<img width="1005" alt="image" src="https://user-images.githubusercontent.com/64528476/203719230-91768c00-dd1d-46df-b3bd-2d6a2f85f685.png">

RPS 33, 평균 response time 40ms 정도.

### 2. ECS

<img width="1004" alt="image" src="https://user-images.githubusercontent.com/64528476/203719374-732989b9-c730-4dbc-9dfa-7533038570ed.png">

<img width="1006" alt="image" src="https://user-images.githubusercontent.com/64528476/203719540-f277190e-8208-49ca-9923-090fb1e96388.png">

RPS 33, 평균 response time 20ms 정도. Task를 2개 돌렸더니 response time이 절반으로 줄은 것 같다.

RPS가 동일한거는 트래픽량이 너무 크지 않아서 queue에는 쌓이지 않은 것 같다.