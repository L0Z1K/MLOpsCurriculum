# Load Balancing

### Auto Scaling Policy

<img width="1087" alt="image" src="https://user-images.githubusercontent.com/64528476/221807192-5e1b43c8-5531-441c-9dd3-06369e2b0c42.png">

과제에 나온대로 Policy를 설정해주었다.

### Locust로 과부하주니 CPU 사용률이 쭉쭉 오른다.

<img width="953" alt="Screenshot 2023-02-28 at 3 42 54 PM" src="https://user-images.githubusercontent.com/64528476/221807425-f896f5c9-8df4-45ec-a4d4-6ebfce5c4ca6.png">

<img width="644" alt="image" src="https://user-images.githubusercontent.com/64528476/221807513-ce45af7c-93eb-4d57-bfe3-24a54ea48a8f.png">

이렇게 3시 37분에 알람이 오게 되었다. 

<img width="1116" alt="Screenshot 2023-02-28 at 3 42 45 PM" src="https://user-images.githubusercontent.com/64528476/221807935-63d837b2-2812-434e-846b-fc7d06d726af.png">

3시 40분에 Desired Task가 2개로 늘어난 것을 확인할 수 있다.

### Task가 늘어남에 따라 CPU 사용률이 감소하고 정상화되었다.

<img width="912" alt="image" src="https://user-images.githubusercontent.com/64528476/221808197-3cf41fe2-c9bf-4827-afd9-e9ae7ae735c8.png">

Response Time도 정상적으로 돌아왔다.

<img width="257" alt="Screenshot 2023-02-28 at 5 11 00 PM" src="https://user-images.githubusercontent.com/64528476/221808303-172e7e85-4336-40bb-9737-b4282a4e4796.png">

<img width="643" alt="image" src="https://user-images.githubusercontent.com/64528476/221808414-57b33769-da8b-488a-9165-920ba69425ab.png">

3시 51분에 정상적이라는 알림을 받을 수 있었다! 