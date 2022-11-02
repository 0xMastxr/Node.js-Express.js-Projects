#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

-   auth.js
-   jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

-   Validate - name, email, password - with Mongoose
-   Hash Password (with bcryptjs)
-   Save User
-   Generate Token
-   Send Response with Token

#### Login User

-   Validate - email, password - in controller
-   If email or password is missing, throw BadRequestError
-   Find User
-   Compare Passwords
-   If no user or password does not match, throw UnauthenticatedError
-   If correct, generate Token
-   Send Response with Token

#### Mongoose Errors

-   Validation Errors
-   Duplicate (Email)
-   Cast Error

#### Security

-   helmet
-   cors
-   xss-clean
-   express-rate-limit

#### Swagger UI

We'll use Swagger UI for the frontend. We will need APIMATIC first to reformat our API:

-   import from POSTMAN (Json export)
-   Environment -> pass the URL of the Heroku project
-   On authentication set bearer option
-   Go to endpoints, on Login and Register we should set Skip Authentication: true
-   Create two folders, one for the auth (where we skip authentication) and one for the jobs (we do not skip authentication)
-   Go to Manage your APIs, Export the API as OpenAPI (v 3.0) YAML

On Swagger UI editor:

-   Paste what we exported before
-   We can see the Job Ids are hard coded, we can modify it on the exported text. See https://youtu.be/qwfE7fSVaZM&t=35357

```yaml
/jobs/{id}:
    parameters:
        - in: path
          name: id
          schema:
              type: string
          required: true
          description: the job id
```

-   We can start testing our API! Remember to authorize yourself with a TOKEN for using the /jobs
