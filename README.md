# Products Service

A REST API built with NestJS for managing products. The service provides CRUD operations with request validation, pagination, database migrations, and end-to-end tests. The project includes containerized development and production environments to simplify local setup and provide a production-ready deployment workflow.

## Requirements

- Docker Engine
- Docker Compose plugin
- Git

## Highlights

- CRUD REST API
- Request validation using NestJS `ValidationPipe`
- Paginated product listing
- Duplicate product detection (`409 Conflict`)
- Database schema managed through Sequelize migrations
- Multi-stage Docker production image
- End-to-end test suite

## Start the development environment

```bash
./startDevEnv.sh
```

The API will be available at:

```text
http://localhost:8001
```

The development environment enables hot reloading, allowing changes under `src/` to be reflected without rebuilding the container.

## Start the production environment

```bash
./startProdApi.sh
```

The API will be available at:

```text
http://localhost:3002
```

The production image is built using a multi-stage Docker build. During container startup, any pending Sequelize migrations are automatically executed before the API begins serving requests.

## Run the end-to-end tests

```bash
./startE2eTests.sh
```

## API examples

### Create a product

```bash
curl -X PUT http://localhost:8001/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "productToken": "mechanical-keyboard",
    "name": "Mechanical Keyboard",
    "priceInCents": 12999,
    "stock": 10
  }'
```

### List products

```bash
curl "http://localhost:8001/v1/products?page=1&limit=10"
```

Expected response:

```json
{
  "data": [
    {
      "productToken": "mechanical-keyboard",
      "name": "Mechanical Keyboard",
      "price": "129.99 €",
      "stock": 10
    }
  ],
  "total": 1
}
```

### Retrieve a product

```bash
curl http://localhost:8001/v1/products/mechanical-keyboard
```

### Update a product

```bash
curl -X PATCH http://localhost:8001/v1/products/mechanical-keyboard \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 25
  }'
```

### Delete a product

```bash
curl -X DELETE http://localhost:8001/v1/products/mechanical-keyboard
```

## Example error scenarios

### Duplicate product

Creating a product with an existing `productToken` returns:

```text
HTTP/1.1 409 Conflict
```

### Product not found

```bash
curl http://localhost:8001/v1/products/unknown-product
```

Expected response:

```text
HTTP/1.1 404 Not Found
```

### Invalid request

Creating a product with an invalid payload returns:

```bash
curl -X PUT http://localhost:8001/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "productToken": "",
    "priceInCents": -1,
    "stock": -1
  }'
```

Expected response:

```text
HTTP/1.1 400 Bad Request
```

## Architecture

The application follows a layered architecture that separates HTTP handling, business logic, and data persistence:

```text
HTTP Request
      │
      ▼
 Controllers
      │
      ▼
  Services
      │
      ▼
 Sequelize
      │
      ▼
    MySQL
```

The database schema is versioned through Sequelize migrations, allowing schema changes to be applied consistently across environments. Development, testing, and production environments are fully containerized, providing a reproducible setup and deployment workflow.