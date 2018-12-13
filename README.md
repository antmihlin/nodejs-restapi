# NodeJs Rest API with JWT

Rest API based on NodeJs, expressJs, PassportJs. 
Uses JsonWebTokens for authentication.

## Getting started

Create mongoDb database. Then start mongod.

Set your DB path in MONGODB_URI variable of .env file placed in root directory.

    git clone https://github.com/antmihlin/nodejs-restapi.git
    
    cd <directory of the project>
    
    npm install
    
    npm start



## UML diagrams

```mermaid
sequenceDiagram
Client ->> API: Request API
API -->>  Client: Static login page
Client ->> API:Credentials sent
API ->> DB: Check user exists and credentials
DB -->> API: Credentials passed
API -->> Client: Send JWT
Client->>API: Get endpoint with JWT header
API->>DB:Request data
DB-->>API: Data from collection
API-->>Client: Json data

```

## References

 - [PassportJs](http://www.passportjs.org/)
 - [NodeJs](https://nodejs.org/en/)
 - [MongoDb](https://www.mongodb.com/)
 - [JWT](https://jwt.io)
 - [Mermaid](https://mermaidjs.github.io/)
