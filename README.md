# Mini Project: E-commerce API

## Instructions

### Collaboration requirements

Please don't split the code. Write every line of code together. In each group, every person should understand every line of code.

### Overview

In this project, you will be using Node, Express, MongoDB and Mongoose in order to create an e-commerce backend app. This app will have 2 types of users: admins of the shop and customers.

We will work through this project in versions. these versions will be as following:

1. E-commerce admin features
2. Customer features
3. Authentication
4. Tests
5. Deployment

We may add or remove few versions as we progress through the project during the bootcamp.

## Working with docker

This app is bootstraped with docker and docker-compose. It containerize the server, as well as the database.

### To start the server

run the command `yarn && yarn start`. This will install all the dependencies and build the docker image

### To install packages

when you run `yarn add PACKAGE` the package will be installed in docker as well automatically. However if you run into issues, you need to stop the server first with `yarn stop` then you can run `yarn build` to rebuild the docker image and start again.

### To prune the containers and data

> ⚠️ WARNING: This is a destructuve command that would delete the containers and all the data inside like database data, and uploads
> you can run `yarn prune` to shutdown the server and delete all the volumes associated with it. This serves as a start fresh command, that will return your server environment to original. It will not affect your code changes though.

## Starter Code

In this project folder, you will find:

1. Express server setup in `/index.js`
2. The database connection is setup in `db/connection.js`

Now the rest is for you to build on your own 😁

### Functional requirements

The requirements will update in each version and you will add to the work you did the in previous version so make sure you write clean code, also, this is why you see requirements titled as Version N.

**Attention**: All types of validation and error handling should be taken in-consideration in all requests.

#### Requirements

- First of all, you need to define your `shop-item` schema, it should at least have these fields (the data types and other validation criterias will be left for you to decide on):
  - title
  - image
  - price
  - description
  - availableCount
  - genre or category

Now, after setting up the model, let's start working on the requests.

_Note: admin routes start with `/admin`._

- The admin should be able to add new shop items.
- The admin should be able to update the details of a shop item, such as description, price, available count, etc.
- The admin should be able to delete one or more items from the items list.
- The admin should be able to search for shop items based on different properties.

Having the project running and admin being able to play around with the shop items, it is time to add the customer features.

Customer routes start with _`/customer`_.

**Note**: _Continue working on the same project. Please don't create a new repo or project and copy all your work from v1 to the new project. Work on the same codebase from v1._

Requirements are:

- Customer is able to get all shop items and filter according to category and price range (for example, items that range in price from 10$ to 50$).
- Customer should be able to search for items.
- A customer is able to add an item to their cart, by sending a request to `/cart` with the customer ID, item ID and quantity requested. Make sure you check there are enough or remaining items in the inventory before adding to the cart. Adding to cart should also decrement the quantity in the shop items inventory.
- After the customer has added items to their cart, they will need to checkout and order, so create a request to the endpoint `/checkout` where you will need to calculate the bill for all the items in the cart and create an `order` object with all order items and bill total and return it to the customer. The cart for that customer should be empty after they order.
- Customer should be able to get the information of a single item.

Model requirements:

- For these operations, you will need to define a new model for the `customer`.
- And another one for the `cart`. The `cart` can be embedded or referenced inside the `customer` model.
- You will also need to define another new model for the customer orders, let's call it `order`. We will have all the customer orders in there after they checkout.

**Note**: _You can create a few dummy records on your customers collection to test out your API routes. Once we implement authentication in an upcoming version, we will use the customer data created after signup/signin. Each customer can have id, name, gender, ..._

We've done an amazing job so far, now it's time to work on the website authentication and authorization so admins can sign in and have their own functionalities and the same for the customers.

- **Admin Authentication:**

  - **Admin signin:**
    - The admin should be able to sign in using an email and a password through the `/admin/signin` endpoint.
    - The admin should remain signed in and have access to the admin routes until they sign out.
  - **Admin signout:** The admin should be able to sign out through the `/admin/signout` endpoint.
  - **Admin authorization:** Only admins must be authorized to access the admin endpoints, which means that you must check if the current user is an admin and is signed in.
  - **Admin functionalities:**
    - The admin should be able to fetch all the orders information from the `/admin/orders` endpoint.
    - The admin should be able to fetch all the customers information from the `/admin/customers` endpoint.
  - **New admin account:** Only an admin can create a new admin account from the `/admin/new-admin` endpoint.

- **Customer Authentication:**

  - **Customer signup:** The customer should be able to sign up using an email and a password or a social media account of your choice i.e. google, facebook, ...etc, through the `/customer/signup` endpoint.
  - **Customer signin:**
    - The customer should be able to sign in using an email and a password or a social media account of your choice i.e. google, facebook, ...etc, through the `/customer/signin` endpoint.
    - The customer should remain signed in and have access to the customer routes until they sign out.
  - **Customer signout:** The customer should be able to sign out through the `/customer/signout` endpoint.
  - **Customer authorization:** Only customers must be authorized to access the customer endpoints, which means that you must check if the current user is a customer and is signed in.
  - **Customer Functionalities:**

    - The customer should be able to fetch all their previous orders information from the `/customer/orders` endpoint.
    - The customer should be able to fetch and update their profile information through the `/customer/profile` endpoint.
    - The customer should be able to update their cart and do CRUD operations on it i.e. add items, remove items, update items by incrementing and decrementing the quantity, ...etc. through the `/customer/cart` endpoint.

    **NOTE:** You must apply authentication check to all previous admin and customer routes created in v1 and v2. This means that you will remove customer ID from request body of previous routes and instead the customer must be identified using the authentication you have setup.

#### Optional BONUS Requirements:

Our focus will always be on backend first, so these requirements are optional and it is alright if you don't implement them. But if you have an interest in practicing frontend through server-side rendering then we recommend you should try to build some views for your application.

- Build the views of your app using `ejs` template engine.
- The views should include the main functionalities of the app for the customer. For example, signup, signin and signout views, all products view, single product view, cart view and checkout view
