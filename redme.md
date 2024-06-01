# File Management API Documentation

## Base URL
http://localhost:5000


## Endpoints

### 1. Create New File

**URL:** `/createFile`

**Method:** `POST`

**Description:** Creates a new file with the specified name and content.

**Body Parameters:**
- `fileName`: The name of the file to be created.
- `fileContent`: The content to be written in the file.

**Example Request in Postman or Thunder Client:**

1. Set the method to `POST`.
2. Enter the URL `http://localhost:5000/createFile`.
3. In the body, select `x-www-form-urlencoded`.
4. Add `fileName` as a key and the desired file name as the value.
5. Add `fileContent` as another key and the content of the file as the value.
6. Send the request.

**Possible Responses:**
- `200 OK`: File created successfully.
- `500 Internal Server Error`: File already exists or error creating file.

### 2. Read Particular File

**URL:** `/readFile`

**Method:** `GET`

**Description:** Reads the content of a specified file.

**Query Parameters:**
- `fileName`: The name of the file to be read.

**Example Request in Postman or Thunder Client:**

1. Set the method to `GET`.
2. Enter the URL `http://localhost:5000/readFile?fileName=demo.txt`.
3. Send the request.

**Possible Responses:**
- `200 OK`: Returns the file content in JSON format.
- `404 Not Found`: File not found.

### 3. View All Files

**URL:** `/viewFiles`

**Method:** `GET`

**Description:** Retrieves a list of all files.

**Example Request in Postman or Thunder Client:**

1. Set the method to `GET`.
2. Enter the URL `http://localhost:5000/viewFiles`.
3. Send the request.

**Possible Responses:**
- `200 OK`: Returns a JSON array of file names.
- `500 Internal Server Error`: Error listing files.

### 4. Delete Particular File

**URL:** `/deleteFile`

**Method:** `DELETE`

**Description:** Deletes a specified file.

**Body Parameters:**
- `fileName`: The name of the file to be deleted.

**Example Request in Postman or Thunder Client:**

1. Set the method to `DELETE`.
2. Enter the URL `http://localhost:5000/deleteFile`.
3. In the body, select `x-www-form-urlencoded`.
4. Add `fileName` as a key and the name of the file to be deleted as the value.
5. Send the request.

**Possible Responses:**
- `200 OK`: File deleted successfully.
- `404 Not Found`: File not found.

## Setting Up the Server
Run the server using `node server.js`.
The server will start and listen on `http://localhost:5000`.


