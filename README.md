# RMDB_project

## Run Frontend
### Package Require
- node.js

## Run Backend
### Package Require (Django Part)
- python
- django & djangorestframework
- pandas
- scikit-learn
- pymongo
- django-cors-headers

### Package Require (Node.js Part)
- node.js
- express.js
- jsonwebtoken
- cors
- mongoose
- dotenv
- bcrypt
- nodemon as devDependencies
- jwt-decode

## How to run for Frontend

1. Clone repository
```
-git clone https://github.com/mynameisO/RMDB_project.git
```
2. Move to frontend folder
```
$ cd frontend
```
3. Install Node Packages
```
$ npm install
```
4. Start frontend project
```
$ npm run dev
```

## How to run for backend
### Django For Review API ( CRUD API ) ( If you use python3 change python to python3 )

1. Move to backend folder
```
$ cd backend
```
2. Move to backend in backend folder to run movie recommend model
```
$ cd backend
```
3. Run movieModels.py to save models that require in our backend
```
$ python movieModels.py
```
2. Start django server
```
$ python manage.py runserver
```

### Node.js For Register / Login Authentication API

1. Move to backend_javasript folder ( inside backend folder )
```
$ cd backend_javascript
```
2. Install node packages
```
$ npm install
```
3. Start server
```
$ npm start
```
All server need .env you can copy code from .env.example and create your .env in folder that have .env.example. 
