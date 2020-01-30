# Fiesta MySQL

## Description:
Fiesta is a very simple inventory system app that tracks inventory across multiple "stores". It was created for demo purposes and not real use hence it was kept very simple.This app connects to a mysql instance and demos CRUD operations using mySQL as a database.

## Installation:
Make sure node is Installed on the machine
To check:
```
node --version
```
To install:
```
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum install -y nodejs
node --version
Clone Repo and install dependencies
git clone https://github.com/sharonpamela/Fiesta-mySQL.git
cd ~/Fiesta-mySQL
npm install
cd ~/Fiesta-mySQL/client
npm install
npm run build
```
## Database info
```
The database schema and sample data the app expects is described in the following file:
FiestaDB-mySL.sql
```
## Run App
```
cd ~/Fiesta-mySQL
npm start
```

## Access App
http//:localhost:3001
