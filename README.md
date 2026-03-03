## Webhook Validation Server

This is a small Express server that exposes a single webhook-style endpoint used by the client app to test and visualize a validation response.

### Overview

- **Tech stack**: Node.js, Express, CORS
- **Port**: `3000`
- **Main file**: `server.js`
- **Primary route**: `POST /webhook`

The `/webhook` endpoint accepts JSON with a `data` field, validates it, transforms it, and returns a JSON response.

### Installation

1. Make sure you have **Node.js** (v14+ recommended) installed.
2. From the `server` folder, install dependencies:

```bash
npm install
```

This uses the `package.json` in the same folder.

### Running the server

From the `server` directory:

```bash
node server.js
```

You should see:

```text
Server running on http://localhost:3000
```

The server will now listen for requests on `http://localhost:3000`.

### API Reference

#### `POST /webhook`

- **URL**: `http://localhost:3000/webhook`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request body**:

```json
{
  "data": "example string"
}
```

- **Validation rules**:
  - `data` is **required**.
  - `data` must be a **string**.

- **Processing steps**:
  1. If `data` is missing or not a string, the server responds with HTTP `400` and an error message.
  2. All non-alphabetic characters are stripped from `data`.
  3. The remaining characters are split into an array.
  4. The array is sorted alphabetically.

- **Successful response** (`200 OK`):

```json
{
  "word": ["a", "e", "l", "m", "p", "x"]
}
```

The `word` field is an array of the sorted alphabetic characters from the input string.

- **Error response** (`400 Bad Request` example):

```json
{
  "error": "Invalid input. Please provide a string in the 'data' field."
}
```

### CORS

The server enables CORS for all routes using the `cors` middleware:

- This allows the frontend client (for example, the HTML page in the `client` folder) to call `http://localhost:3000/webhook` from a different origin.

### Example curl request

You can test the server manually using `curl`:

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"data": "Webhook123!"}'
```

Expected response:

```json
{
  "word": ["b", "e", "e", "h", "k", "o", "o", "r", "w"]
}
```

