# Expense Tracker

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
