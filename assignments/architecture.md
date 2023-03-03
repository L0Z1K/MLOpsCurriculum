# Architecture

![image](https://user-images.githubusercontent.com/64528476/222731566-ff689505-a31a-4712-8182-b8fa415b5035.png)

중요한 5개의 Component가 있습니다.

### 1. API Gateway

- 모든 통신은 gRPC로 해야 합니다. REST API가 가지는 속도의 한계가 있기 때문에 초당 만개의 트래픽을 처리하기 위해 gRPC를 택하였습니다. [참고한 블로그](https://blog.dreamfactory.com/grpc-vs-rest-how-does-grpc-compare-with-traditional-rest-apis/#:~:text=In%20fact%2C%20he%20reported%20that,HTTP%2F2%20by%20gRPC.%E2%80%9D)
- 점심 메뉴를 추천받기 위해 Request를 보내면 그 Request를 Inference로 전달하고 받은 Response를 User에게 전달합니다.
- User로부터 식당에 대한 리뷰를 받으면 이를 Kafka로 전달합니다.

### 2. Inference

- 실제로 팀에 속한 사람들을 토대로 메뉴를 추천해주는 Component 입니다.
- 수많은 트래픽을 견뎌내기 위해 Auto Scaling이 필요합니다. Auto Scaling을 할 때, CPUUtilization 값을 보고 하는 것보다 메뉴 추천이 많이 되는 오전 11시 반 - 오후 12시에 Task를 늘려주는 방식이 더 좋겠습니다.
- ECS는 Redis를 가지고 있어서 직원이 0점 리뷰를 준 메뉴에 대한 정보를 가지고 있고 이를 inference하는 데 사용합니다.
- Trainer가 자정에 시작한 학습을 마치고 체크포인트를 전달하면 받습니다.

### 3. Kafka

- API Gateway로부터 전달받은 데이터가 초당 굉장히 많이 들어오기 때문에 1분 정도 window size를 설정해서 모아서 S3에 저장합니다.

### 4. Trainer

- S3로부터 리뷰 데이터를 가져와서 CF 같은 모델을 학습합니다.
- 하루에 한번 학습을 합니다.
- 전달하는 모델 사이즈를 줄이기 위해 ONNX 패키징을 진행합니다.

### 5. Review Data - RDS

- 팀원에 식당에 대해 남긴 평점을 기록합니다.