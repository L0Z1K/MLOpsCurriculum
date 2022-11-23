from locust import HttpUser, task, between

class User(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_all_user(self):
        self.client.get("/users")
    
    @task
    def create_user(self):
        with self.client.post("/users", json={"name": "test", "age": 13}, catch_response=True) as response:
            if response.status_code == 409:
                response.success()