# Dev-G01-INFLUX
To get the server running:
```
npm install mongodb 
npm install mongoose
```

The backend is intended to connect with a local MongoDB database. Please install Mongo (localhost) and MongoDB Compass. (https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

The index.js file is able to connect to a local database called test-users. Either method below allows the app to establish a connection with the database.
1. Create a local mongodb called test-users
2. If you have your own local mongodb database, then simply provided localhost uri string for connectivity in the index.js file (this will just be removing test-users and replacing with the name of your database)
