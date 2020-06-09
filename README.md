# SW-Praktikum-Gruppe-1-SS2020
Hochschule der Medien - Modul Software Praktikum (335138b) - Gruppe 1 - Sommersemester 2020


## Frontend - tbf
All code is located under /frontend. <br>
As advised per the project requirements we used React & Material-UI.<br>
Testing for the frontend is done via the fake-http-backend, until our "real" backend is finished.<br>
To run it install the packages inside the package.json, via your package manager of choice and run it.<br>

```
cd /frontend 
npm install 
npm start
or
yarn install 
yarn start
```

# Fake-HTTP-Backend
Files are located inside /http-fake-backend.
Install via your favourite package manager and run it afterwads.
It will expose a temporary HTTP Backend @ http://localhost:8081
To change the config see config.js.
To change add new routes / change current routes see the python-mockbackend-config.js inside under /server/api/

```
cd /frontend/http-fake-backend
npm install 
npm start
or
yarn install 
yarn start
```

## Backend - tbf
All code is located under /src. <br>
To run the application on your own device, clone the repo. <br>
Install the requirements inside requirements.txt & run the application by launching main.py <br>
You need to be inside the src folder to run the backend. <br>

```
pip install -r requirements.txt     
python main.py    
```


## Database - tbf
- MySQL Community Server 8.0.20
    - https://dev.mysql.com/downloads/mysql/
- Google Cloud SQL
    This requires the Google Cloud SDK & Google Cloud Proxy.
    See Google Documentation for install methods.
    Connection String for Proxy to get secure access to the Google Environment:
    ```
    ./cloud_sql_proxy -instances=sw-praktikum-gruppe-1-ss2020:europe-west3:swpraktikum-sql=tcp:3306
    ```


## Deployment on Google Cloud - tbf
Google App Engine Standard Envoirnment is on Python Version 3.7.2. <br>
Google Cloud SQL is on MySQL 5.7, access is provided via sqlconnector. <br>
See .yaml for extra config.
To update deployed version of python code see commands below.<br>

Commands of use:
```
gcloud app deploy
```

