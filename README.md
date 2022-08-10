# API server for the ecommerce admin cms

Here is the repo for the frontend app ................
...more about the frontend...........................

## APIS

All the api end points will flow the following patterns ` {rootUrl}/api/v1/`

### Admin user api

This api end point is responsible for handling all the admin user related api calls
All the admin api endpoints will flow the following patterns ` {rootUrl}/api/v1/admin-user`
|# | PATH | METHOD | PRIVATE| DESCRIPTION |
|---|---|---|---|---|
| 1. |`/` |POST|NO|Receives new admin data and creates new admin in our database. IF admin user's email already exists, It will return error otherwise it will return success with user info from dataabase|
|2.| `/verify-email`|PATCH| NO |Receives `email, verification code ` to verify newly created user action , returns success or error accordingly.|

|3.|`/login`|POST|NO|Receives `{email, password}` and checks if the user exists fot that combination in our database, if it does, it will handle all the login process.|
