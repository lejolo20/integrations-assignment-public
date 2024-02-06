# Assignment for the freelancer

## Steps to follow

1. Create Revo tables/zones models
2. Create getRevoTables function (index.ts)
3. Create unit tests for getRevoTables function
4. The freelancer will set up a server with an endpoint (POST) which will listen to queries from the outside (getTables)
5. The freelancer will set up an authorization via a Dummy API Token

## Delivery (48 hours from the reception of the assignment)

-   The freelancer will provide the code for an Express Server using Typescript
-   The freelancer will provide documentation for connecting to the endpoint (token and options)
-   The freelancer will provide the repository containing the freelancer's code

> Note: There is valuable info in the .env file

## Technologies

-   Node.js
-   Express.js
-   TypeScript

## Installation

To install and run this project, follow these steps:

1. Clone the repository: `git clone https://github.com/lejolo20/integrations-assignment-public.git`
2. Navigate to the project directory: `cd integrations-assignment-public`
3. Install the dependencies: `npm install dotenv express`
4. The development dependencies used are:
   {
   "@babel/core"
   "@babel/preset-env"
   "@babel/register"
   "@jest/globals"
   "@types/express"
   "@types/jest"
   "jest"",
   "nock"
   "ts-node-dev"
   "typescript"
   }
5. Compile the project: `npm run tsc`
6. the project scripts are:
   {
   "dev": "ts-node-dev src/index.ts",
   "start": "node build/index.js",
   "tsc": "tsc",
   "test": "jest"
   }
7. Execute the project: `npm dev`

## Use

This technical test starts a server with Typescript and each of the steps indicated in the README in the ##Steps to follow were developed.

## Token and Endpoint

To connect to the gettables endpoint, we go to ThunderClient in VSC or Postman, make a POST request to http://localhost:3000/api/external/v2/login, and provide a user from the dummyJSON database which can be obtained from here (https://dummyjson.com/users). To log in, here use the user with id:4 which is as follows:

{
"username":"yraigatt3",
"password":"sRQxjPfdS"
}
There we get the authorization token:
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJ5cmFpZ2F0dDMiLCJlbWFpbCI6InlyYWlnYXR0M0BuYXR1cmUuY29tIiwiZmlyc3ROYW1lIjoiTWlsZXMiLCJsYXN0TmFtZSI6IkN1bW1lcmF0YSIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vcm9ib2hhc2gub3JnL01pbGVzLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcwNzIxODkxNywiZXhwIjoxNzA3MjIyNTE3fQ.2fUwuqPjMtYLgf59mnOnowQI2wv-VYxBZzPrmLu63X0"
}
then with this token, copy and paste it into AUTH -> BEARER, then make a POST request to http://localhost:3000/api/external/v2/auth/gettables and place in the JSON the required getTable
{
id: number
name: string
x: number
y: number
width: number
height: number
baseX: number
baseY: number
isJoined: number
joined_with_id: null | number
baseWidth: number
baseHeight: number
color: string
type_id: number
room_id: number
price_id: number
}

data to send the request.
