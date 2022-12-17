# MLOpsCurriculum
I'm a MLOps Engineer at Corca.

## Phase1.

- EC2 endpoint: http://3.38.165.145:3000/
- ECS endpoint: http://52.78.77.252:3000/

### Summary

- User에게 Service를 제공하기 위한 API를 만드는 것이 주 목적이다.
- API를 개발할 때, 여러 개발자들과 함께 협업하기 위해서 Git을 사용하게 된다. Git은 Code Review를 쉽게 할 수 있도록 한다.
- API를 RESTful하게 만든다면, URL이 직관적이고 에러 메시지가 잘 나오기 때문에 보다 유용하게 사용할 수 있다.
- 데이터를 저장하기 위해서 데이터베이스를 사용하며 자신이 다루는 데이터에 맞는 DB를 사용해야 한다.
- 제 컴에서 되는데요?를 막기 위해 코드를 Container화 시켜서 배포를 하게 된다.
- Container를 Cloud Service를 통해 배포하게 되면, 보다 서버 관리가 On-premise에서 하는 것보다 쉬워진다.

### Review

- 백엔드를 처음 하는 거다 보니 사소한 에러에 대해서도 시간을 많이 잡아먹었다. 물론 결국에는 다 해결하긴 했지만 생각보다 Phase 1 마무리하는데 너무 오래 걸린 것 같아서 아쉽다.
- 확실히 이쪽 분야는 CS 개념 지식을 많이 필요로 하는 것 같다. 네트워크 이론, 데이터베이스 등 더 많은 공부가 필요하다.
- AWS ECS로 결국 배포까지 했지만 내가 잘한 건지는 모르겠다. 너무 복잡하다 AWS의 세계는..
- NestJS로 RESTful API를 만든 것이 굉장히 뿌듯했다. Python 원툴러로서 typescript와 더 친해지고 싶다.

### Feedback

- Database에서 과제가 왜 없는지 모르겠다. 이 코스에서 AWS RDS를 한번 다뤘으면 마지막 코스인 ECS에서 보다 수월했을 것 같다. 
- 확실히 이전 코스보다 ECS 코스일 때, 설명이 약간은 불친절하다는 느낌을 받았다. 물론 공식 docs가 가장 좋은 reference라지만, 노션에서 구어체를 활용하여 설명을 해줬으면 좋았을 것 같다. VPC, Subnet 등 AWS의 네트워크에 대해서도 추가적인 공부가 필수적인데, 이 부분에 대해서 노션에 추가적인 설명이 있었으면 좋았을 것 같다.
- Docker를 다양하게 써볼 수 있는 과제가 있으면 좋겠다. 예를 들어, Dockerfile을 하나주고 최대한 최적화해서 이미지 크기 30MB 이하로 줄이기. 이런 식으로..?  