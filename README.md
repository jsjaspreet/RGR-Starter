# RGR Starter

Prerequisites: Have Node.js, Docker, Yarn installed

Up and Running:
- yarn (install dependencies)
- docker-compose up -d (will take a while the first time, it pulls down docker images and then sets up docker containers on your local network)
- make migrate (runs migrations to set up the schema in postgres)
- npm run update-relay (runs a compiler step for relay modern)
- npm run dev (starts up webpack dev server with HMR, give it a bit to be up and running)
- http://localhost:8080 two users, one "admin" another "test", pass for both is "pass"

