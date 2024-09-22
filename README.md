# API Documentation

---

## **Catalog Routes**

### Get All Catalog
- **URL**: `/catalog`
- **Method**: `GET`
- **Description**: Mendapatkan semua katalog yang tersedia.
- **Response**:
  - `200 OK`: Mengembalikan daftar katalog.
  - `500 Internal Server Error`: Jika ada kesalahan pada server.

---

## **Product Routes**

### Create a Product
- **URL**: `/products`
- **Method**: `POST`
- **Description**: Membuat produk baru.
- **Request Body**:
  - `name` (string, required): Nama produk.
  - `image` (file, required): Gambar produk.
  - `description` (string, required): Deskripsi produk.
  - `price` (number, required): Harga produk.
  - `stock` (number, required): Stok produk.
  - `minPurchase` (number): Minimum Pembelian.
  - `isActive` (boolean): Status produk.
- **Response**:
  - `201 Created`: Mengembalikan objek produk yang dibuat.
  - `500 Internal Server Error`: Jika ada kesalahan server.

---

### Get All Products
- **URL**: `/products`
- **Method**: `GET`
- **Description**: Mendapatkan semua produk yang tersedia.
- **Response**:
  - `200 OK`: Mengembalikan daftar produk.
  - `500 Internal Server Error`: Jika ada kesalahan pada server.

---

### Get Product by ID
- **URL**: `/products/:id`
- **Method**: `GET`
- **Description**: Mendapatkan produk berdasarkan ID.
- **Params**:
  - `id` (string): ID produk.
- **Response**:
  - `200 OK`: Mengembalikan produk yang diminta.
  - `404 Not Found`: Jika produk tidak ditemukan.

---

### Update a Product
- **URL**: `/products/:id`
- **Method**: `PUT`
- **Description**: Memperbarui produk berdasarkan ID.
- **Params**:
  - `id` (string): ID produk.
- **Request Body**: Field produk yang ingin diperbarui.
- **Response**:
  - `200 OK`: Mengembalikan objek produk yang diperbarui.
  - `404 Not Found`: Jika produk tidak ditemukan.

---

### Delete a Product
- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Description**: Menghapus produk berdasarkan ID.
- **Params**:
  - `id` (string): ID produk.
- **Response**:
  - `200 OK`: Mengembalikan objek produk yang dihapus.
  - `404 Not Found`: Jika produk tidak ditemukan.

---

## **Bundle Routes**

### Create a Bundle
- **URL**: `/bundles`
- **Method**: `POST`
- **Description**: Membuat bundle baru.
- **Request Body**:
  - `name` (string, required): Nama bundle.
  - `image` (file, required): Gambar bundle.
  - `description` (string, required): Deskripsi bundle.
  - `products` (array of strings, required): Daftar ID produk dalam bundle.
- **Response**:
  - `201 Created`: Mengembalikan objek bundle yang dibuat.
  - `500 Internal Server Error`: Jika ada kesalahan server.

---

### Get All Bundles
- **URL**: `/bundles`
- **Method**: `GET`
- **Description**: Mendapatkan semua bundle yang tersedia.
- **Response**:
  - `200 OK`: Mengembalikan daftar bundle.
  - `500 Internal Server Error`: Jika ada kesalahan server.

---

### Get Bundle by ID
- **URL**: `/bundles/:id`
- **Method**: `GET`
- **Description**: Mendapatkan bundle berdasarkan ID.
- **Params**:
  - `id` (string): ID bundle.
- **Response**:
  - `200 OK`: Mengembalikan bundle yang diminta.
  - `404 Not Found`: Jika bundle tidak ditemukan.

---

### Update a Bundle
- **URL**: `/bundles/:id`
- **Method**: `PUT`
- **Description**: Memperbarui bundle berdasarkan ID.
- **Params**:
  - `id` (string): ID bundle.
- **Request Body**: Field bundle yang ingin diperbarui.
- **Response**:
  - `200 OK`: Mengembalikan objek bundle yang diperbarui.
  - `404 Not Found`: Jika bundle tidak ditemukan.

---

### Delete a Bundle
- **URL**: `/bundles/:id`
- **Method**: `DELETE`
- **Description**: Menghapus bundle berdasarkan ID.
- **Params**:
  - `id` (string): ID bundle.
- **Response**:
  - `200 OK`: Mengembalikan objek bundle yang dihapus.
  - `404 Not Found`: Jika bundle tidak ditemukan.

---

## **Cart Routes**

### Add Product to Cart
- **URL**: `/carts/add-product`
- **Method**: `POST`
- **Description**: Menambahkan produk ke keranjang.
- **Request Body**:
  - `product_id` (string, required): ID produk.
  - `quantity` (number, required): Jumlah produk yang ditambahkan (default: 1).
- **Response**:
  - `200 OK`: Mengembalikan objek keranjang yang diperbarui.
  - `404 Not Found`: Jika produk tidak ditemukan.
  - `500 Internal Server Error`: Jika ada kesalahan server.

---

### Add Bundle to Cart
- **URL**: `/carts/add-bundle`
- **Method**: `POST`
- **Description**: Menambahkan bundle ke keranjang.
- **Request Body**:
  - `bundle_id` (string, required): ID bundle.
  - `quantity` (number, required): Jumlah bundle yang ditambahkan (default: 1).
- **Response**:
  - `200 OK`: Mengembalikan objek keranjang yang diperbarui.
  - `404 Not Found`: Jika bundle tidak ditemukan.
  - `500 Internal Server Error`: Jika ada kesalahan server.

---

### Get Cart
- **URL**: `/carts`
- **Method**: `GET`
- **Description**: Mendapatkan isi keranjang saat ini.
- **Response**:
  - `200 OK`: Mengembalikan objek keranjang dengan produk, bundle, dan total harga.
  - `200 OK`: Mengembalikan pesan keranjang kosong jika tidak ada keranjang.
  - `500 Internal Server Error`: Jika ada kesalahan server.

