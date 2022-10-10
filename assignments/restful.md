# Assignment

특정 유저의 돈을 다른 유저에게 전달하는 상황 (ex. 3번 사람이 4번 사람에게 1000원 전달)

> POST /transaction

### Parameter

```json
{
    "from": 3, // int, 보낼 사람의 id
    "to": 4, // int, 받을 사람의 id
    "amount": 1000 // int, 전달할 금액
}
```

### Response

```json
{
    "from": 3, // int, 보낸 사람의 id
    "to": 4, // int, 받을 사람의 id
    "amount": 1000 // int, 전달한 금액
}
```

### Error Message

|Error Code|Message|Description|
|---|---|---|
|400|The amount is not valid.|보내는 금액이 0보다 작은 경우 또는 Balance보다 amount가 큰 경우|
|400|Type is not correct.|Parameter의 Type이 잘못된 경우|
|403|You don't have permission to transfer.|보내는 사람에 대한 권한이 없는 경우|
|404|The user is not found.|보내는 사람이나 받는 사람이 존재하지 않는 경우|

