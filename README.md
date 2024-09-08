# API Documentation

## Base URL
All routes will be prefixed with `/api/`.

---

## **Bundle Routes**

### Create a Bundle
- **URL**: `/api/bundles`
- **Method**: `POST`
- **Description**: Create a new bundle.
- **Request Body**: 
  - `bundle_id` (string, required): Unique identifier for the bundle.
  - `name` (string, required): Name of the bundle.
  - `totalprice` (number, required): Total price of the bundle.
  - `products` (array of strings, required): List of product IDs included in the bundle.
- **Response**:
  - `201 Created`: Returns the created bundle object.
  - `500 Internal Server Error`: If there was a server error.

---

### Get All Bundles
- **URL**: `/api/bundles`
- **Method**: `GET`
- **Description**: Retrieve all bundles.
- **Response**:
  - `200 OK`: Returns an array of bundle objects.
  - `500 Internal Server Error`: If there was a server error.

---

### Get Bundle by ID
- **URL**: `/api/bundles/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific bundle by its ID.
- **Params**:
  - `id` (string): Bundle ID.
- **Response**:
  - `200 OK`: Returns the requested bundle object.
  - `404 Not Found`: If the bundle is not found.

---

### Get Bundle by Name
- **URL**: `/api/bundles/name/:name`
- **Method**: `GET`
- **Description**: Retrieve a specific bundle by its name.
- **Params**:
  - `name` (string): Bundle name.
- **Response**:
  - `200 OK`: Returns the requested bundle object.
  - `404 Not Found`: If the bundle is not found.

---

### Update a Bundle
- **URL**: `/api/bundles/:id`
- **Method**: `PUT`
- **Description**: Update an existing bundle by its ID.
- **Params**:
  - `id` (string): Bundle ID.
- **Request Body**: 
  - `name` (string, optional): Updated name for the bundle.
  - `totalprice` (number, optional): Updated total price for the bundle.
  - `products` (array of strings, optional): Updated list of product IDs in the bundle.
- **Response**:
  - `200 OK`: Returns the updated bundle object.
  - `404 Not Found`: If the bundle is not found.

---

### Delete a Bundle
- **URL**: `/api/bundles/:id`
- **Method**: `DELETE`
- **Description**: Delete a specific bundle by its ID.
- **Params**:
  - `id` (string): Bundle ID.
- **Response**:
  - `200 OK`: Returns the deleted bundle object.
  - `404 Not Found`: If the bundle is not found.

---

## **Cart Routes**

### Add Product to Cart
- **URL**: `/api/cart/add-product`
- **Method**: `POST`
- **Description**: Add a product to the cart.
- **Request Body**:
  - `product_id` (string, required): The product ID.
  - `quantity` (number, required): The quantity to add (default: 1).
- **Response**:
  - `200 OK`: Returns the updated cart object.
  - `404 Not Found`: If the product is not found.
  - `500 Internal Server Error`: If there was a server error.

---

### Add Bundle to Cart
- **URL**: `/api/cart/add-bundle`
- **Method**: `POST`
- **Description**: Add a bundle to the cart.
- **Request Body**:
  - `bundle_id` (string, required): The bundle ID.
  - `quantity` (number, required): The quantity to add (default: 1).
- **Response**:
  - `200 OK`: Returns the updated cart object.
  - `404 Not Found`: If the bundle is not found.
  - `500 Internal Server Error`: If there was a server error.

---

### Get Cart
- **URL**: `/api/cart`
- **Method**: `GET`
- **Description**: Retrieve the current cart.
- **Response**:
  - `200 OK`: Returns the cart object with products, bundles, and total price.
  - `200 OK`: Returns an empty cart message if no cart is found.
  - `500 Internal Server Error`: If there was a server error.

---

## **Product Routes**

### Create a Product
- **URL**: `/api/products`
- **Method**: `POST`
- **Description**: Create a new product.
- **Request Body**: 
  - `product_id` (string, required): Product ID (unique).
  - `name` (string, required): Name of the product.
  - `image` (string, required): URL of the product image.
  - `category` (string, required): Product category.
  - `description` (string, required): Product description.
  - `price` (number, required): Price of the product.
  - `stock` (number, required): Available stock.
  - `min_purchase` (number, optional): Minimum purchase amount (default: 1).
- **Response**:
  - `201 Created`: Returns the created product object.
  - `400 Bad Request`: If required fields are missing.
  - `500 Internal Server Error`: If there was a server error.

---

### Get Product by ID
- **URL**: `/api/products/:id`
- **Method**: `GET`
- **Description**: Retrieve a product by its ID.
- **Params**:
  - `id` (string): Product ID.
- **Response**:
  - `200 OK`: Returns the requested product object.
  - `404 Not Found`: If the product is not found.

---

### Get Product by Name
- **URL**: `/api/products/name/:name`
- **Method**: `GET`
- **Description**: Retrieve a product by its name.
- **Params**:
  - `name` (string): Product name.
- **Response**:
  - `200 OK`: Returns the requested product object.
  - `404 Not Found`: If the product is not found.

---

### Get Product by Category
- **URL**: `/api/products/category/:category`
- **Method**: `GET`
- **Description**: Retrieve products by category.
- **Params**:
  - `category` (string): Product category.
- **Response**:
  - `200 OK`: Returns an array of products in the requested category.
  - `404 Not Found`: If no products are found in the category.

---

### Get All Products
- **URL**: `/api/products`
- **Method**: `GET`
- **Description**: Retrieve all products.
- **Response**:
  - `200 OK`: Returns an array of product objects.
  - `500 Internal Server Error`: If there was a server error.

---

### Update a Product
- **URL**: `/api/products/:id`
- **Method**: `PUT`
- **Description**: Update an existing product by its ID.
- **Params**:
  - `id` (string): Product ID.
- **Request Body**: Updated fields of the product.
- **Response**:
  - `200 OK`: Returns the updated product object.
  - `404 Not Found`: If the product is not found.

---

### Delete a Product
- **URL**: `/api/products/:id`
- **Method**: `DELETE`
- **Description**: Delete a specific product by its ID.
- **Params**:
  - `id` (string): Product ID.
- **Response**:
  - `200 OK`: Returns the deleted product object.
  - `404 Not Found`: If the product is not found.
