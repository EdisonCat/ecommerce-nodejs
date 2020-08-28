# E-Commerce-NodeJS
E-Commerce NodeJS is a REST API server used to manage information of products and orders. It has common functionalities, including user singup, login, upload product(image) and information, create orders, etc. It was implemented with NodeJS and MongoDB Atlas, Users can only use the APIs after logging in. 

## Framework and Tools
NodeJS, ExpressJS: Environment/platform and framework.

Mongoose: Database tool used to connect to the database and model objects. 

Multer: Storage tool used to upload and store an image to the database.

BCrypt, Json Web Token(JWT): Verification and security tools used to store user password and create token for users.

## API
### User
POST: http://localhost:3000/user/signup - Posts a new user via request body(json) to the database

POST: http://localhost:3000/user/login - Returns a token to the user if the user information in the request matches one in the databse
#### After logging in, the user can start to use the APIs.

### Product
GET: http://localhost:3000/products - Returns the list of all products from the database

POST: http://localhost:3000/products - Posts a new products via request body(form-data, properties: "name", "price", "productImage"(file)) to the database

GET: http://localhost:3000/products/:productId - Returns an existed product with specified productId from the database

DELETE: http://localhost:3000/products/:productId - Deletes an existed product with specified productId from the database

### Order
GET: http://localhost:3000/orders - Returns the list of all orders from the database

POST: http://localhost:3000/orders - Posts a new order via request body(json, properties "quantity" and "productId" required) to the database

GET: http://localhost:3000/orders/:orderId - Returns an existed order with specified orderId from the database

DELETE: http://localhost:3000/orders/:orderId - Deletes an existed order with specified orderId from the database

DELETE: http://localhost:3000/orders/all - Deletes all existed orders from the database

![project screenshot](https://github.com/EdisonCat/ecommerce-nodejs/blob/master/screenshots/project.png)
![login](https://github.com/EdisonCat/ecommerce-nodejs/blob/master/screenshots/login.png)
![get after logging in](https://github.com/EdisonCat/ecommerce-nodejs/blob/master/screenshots/get.png)
