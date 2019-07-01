# Expense Tracker

## Postman collection link [here](https://www.getpostman.com/collections/a1e32c8319ab5e677b21)
#### Running with docker

Steps to run with docker:

`
docker-compose up
`

Run test with docker:

`
docker-compose run web npm run test
`

#### Running without docker
* Make sure postgresql is installed.

* Install packages
`
npm install
`

* Add .env file with all enviroment variable. For reference see `env.example` file

* Run migrations
`
npm run migrate
`
* Start the server
`
npm run start
`
