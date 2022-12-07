## Endpoints CMS & SERVER

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /googleLogin`

- `GET /products`
- `GET /products/:productCode`

- `GET /orders`
- `GET /orders/city`
- `GET /orders/cost`
- `POST /orders/:id`
- `PATCH /orders/:id`
- `DELETE /orders/:id`

### POST /register

#### Description

- Create a new user data

#### Request

- Body
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string"
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "data": {
      "id": "integer",
      "email": "string",
      "msg": "Login Success!"
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
      "msg":"Email already used",
  }
  OR
  {
      "msg":"Username is required",
  }
  OR
  {
      "msg":"Email is required",
  }
  OR
  {
      "msg":"Format must be email",
  }
  OR
  {
      "msg":"Password is required",
  }
  OR
  {
      "msg":"Password must be at least 5 characters",
  }
  OR
  {
      "msg":"Phone number is required",
  }
  OR
  {
      "msg":"Address is required"
  }
  ```

### POST /login

#### Description

- Login with user data

#### Request

- Body
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "access_token": "string"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "msg": "Error invalid email or password"
  }
  ```

### POST /googleLogin

#### Description

- login with user data from google

#### Request

- Body
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response

_200 - Ok_

- Body
  ```json
  {
    "access_token": "string",
    "msg": "Login Success"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "msg": "Error google login"
  }
  ```

### GET /products

#### Description

- Get all the products data

### Request

- headers:

```json
{
  "access_token": "string"
}
```

#### Response

_200 - OK_

- Body

  ```json
   [
      {
        "id": "integer",
        "name": "string",
        "facility": "string",
        "roomCapacity": "integer",
        "imgUrl": "string",
        "authorId": "integer",
        "location": "string",
        "price": "integer",
        "typeId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
      },
      ...
    ]
  ```

### GET /products/:productCode

#### Description

- Read a product data based on given id

#### Request

- Params

  ```json
  {
    "id": "integer"
  }
  ```

- headers:

```json
{
  "access_token": "string"
}
```

#### Response

_200 - OK_

- Body

```json
{
  "data": {
    "id": "integer",
    "name": "string",
    "facility": "string",
    "roomCapacity": "integer",
    "imgUrl": "string",
    "authorId": "integer",
    "location": "string",
    "price": "integer",
    "typeId": "integer"
  }
}
```

_404 - Not Found_

- Body
  ```json
  {
    "msg": "product Not Found"
  }
  ```

### PATCH /orders/:id

#### Description

- Modify status in orders table data based on given id

#### Request

- Params

  ```json
  {
    "id": "integer"
  }
  ```

- headers:

```json
{
  "access_token": "string"
}
```

- Body

```json
{
  "status": "string"
}
```

#### Response

_200 - OK_

- Body

```json
{
  "msg": "Success to update status!"
}
```

_404 - Not Found_

- Body
  ```json
  {
    "msg": "product Not Found"
  }
  ```

### DELETE /orders/:id

#### Description

- Remove a order data based on given id

#### Request

- Params

  ```json
  {
    "id": "integer"
  }
  ```

- headers:

```json
{
  "access_token": "string"
}
```

#### Response

_200 - OK_

- Body
  `json { msg: `orders success to delete`}`

  _404 - Not Found_

- Body
  ```json
  {
    "msg": "product Not Found"
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "msg": "Internal Server Error"
  }
  ```
