# RSS Reader – Full Stack Application

A full-stack RSS Reader application built with **Angular 19.2.7** (frontend), **Node.js 18 + Express + Sequelize** (backend), and **PostgreSQL 15** as the database. RSS feeds can be added, parsed, displayed, refreshed, updated, and deleted.

![alt text](screenshot.png)

- Node.js: **v18+**
- Angular: **v19**
- PostgreSQL: **v15**

### continuous integration and continuous delivery/continuous deployment  CI/CD is done:
![alt text](cicd.png)

---

## Project Structure

![alt text](uml.png)
---

## Features

- Add and manage RSS feeds
- Parse and store feed items
- View and search feed entries
- Refresh/update feed content
- Delete feeds and associated items
- Graceful error handling for invalid URLs
- Infinit scroling and UI filtering
- Fully containerized with Docker

---

## Technologies Used

- **Frontend**: Angular, RxJS, TypeScript, HTML/CSS
- **Backend**: Node.js, Express.js, Sequelize ORM, JavaScript
- **Database**: PostgreSQL
- **Parsing**: rss-parser
- **Containerization**: Docker, Docker Compose

---

### Clone the repo

```bash
git clone https://github.com/DrcKarim/RSSNewsReader-AngularNodeJs.git
cd RSSNewsReader-AngularNodeJs
```

## Setup Instructions For Docker

### 1. Run with Docker
Run this commandes inside the folder of the project in terminal. 

cd RSSNewsReader-AngularNodeJs

Run this first and wait the pulling
```bash
docker-compose pull
```

Then run this commande to build
```bash
docker-compose up --build
```

Backend → http://localhost:3000

Frontend → http://localhost:4200

PostgreSQL runs internally via Docker

### 2. Docker Services Overview

Frontend : 4200 

Backend : 3000 

db : 5432

## Setup Instructions For Local building

### 1. Environment variables

 ==> You should create a user and password in PostgreSQL and replace DB_USER and DB_PASSWORD value
 
```bash
DB_NAME=rssreadersomone
DB_USER=karimsomone
DB_PASSWORD=karimsomone
DB_HOST=localhost
```

### 2. Frontend Commands  

```bash
cd Frontend
npm install
ng serve
```

### 3. Backend Commands 

```bash
cd Backend
npm install
node app.js
```

## License 

This project is for educational purposes — customize it freely.