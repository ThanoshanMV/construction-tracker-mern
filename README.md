# Construction Tracker

## What is Contruction Tracker?

* When you want to build a construction, you need to submit a form, related documents to the authority to get the approval in Sri Lanka. 
* In the authority perspective, they have to manage many client approval forms. 
* For each client, they have to pass the related documents to specific officials to get authorization.
* This process takes time. Whether the approval request is accepted, rejected, in progress or
needing related documents from the client, the authorities have to clarify to clients about the
status of their requests whenever the client asks.
* Authorities have to track the construction approval form status for effective and efficient
governance. 
* Construction Tracker is a web application to track these construction statuses.
* MERN stack is used to develop this application. 

## Getting Started
* Fork and clone the repository:
```
$ git clone https://github.com/USERNAME/construction-tracker-mern.git
```
* Install all the dependencies
```
$ cd construction-tracker-mern/
$ cd client/
$ npm install
$ cd ..
$ npm install
```

## Configurations
* Create a file named "default.json" inside the config directory
* Add these inside that file:
```
{
  "mongoURI": "MONGODB_URI",
  "jwtSecret": "SECRET_KEY",
  "user": "EMAIL_ID",
  "pass": "EMAIL_PASSWORD"
}

```
Example: 
```
{
  "mongoURI": "https://cloud.mongodb.com/",
  "jwtSecret": "ThisMySecretKey!",
  "user": "example@gmail.com",
  "pass": "abc1234"
}

```

## Run 
* Run the server:
```
$ npm run server
```
* Run the client:
```
$ npm run client
```
* Run the client and server concurrently:
```
$ npm run dev

```
