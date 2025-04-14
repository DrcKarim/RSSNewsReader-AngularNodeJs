# 📰 RSS Reader – Full Stack Application

A full-stack RSS Reader application built with **Angular 19.2.7** (frontend), **Node.js 18 + Express + Sequelize** (backend), and **PostgreSQL 15** as the database. RSS feeds can be added, parsed, displayed, refreshed, updated, and deleted.

- Node.js: **v18+**
- Angular: **v17**
- PostgreSQL: **v15**
---

## 📁 Project Structure

---

## 🚀 Features

- Add and manage RSS feeds
- Parse and store feed items
- View and search feed entries
- Refresh/update feed content
- Delete feeds and associated items
- Graceful error handling for invalid URLs
- Pagination and UI filtering
- Fully containerized with Docker

---

## ⚙️ Technologies Used

- **Frontend**: Angular, RxJS, TypeScript, HTML/CSS
- **Backend**: Node.js, Express.js, Sequelize ORM
- **Database**: PostgreSQL
- **Parsing**: rss-parser
- **Containerization**: Docker, Docker Compose

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/rss-reader-app.git
cd rss-reader-app

#Environment variables
```
DB_NAME=rssreader
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=db
```

#Run with Docker
```
docker-compose up --build
```

Backend → http://localhost:3000

Frontend → http://localhost:4200

PostgreSQL runs internally via Docker

#Docker Services Overview

Frontend : 4200 

Backend : 3000 

db : 5432

#Frontend Commands (optional, outside Docker)
```
cd Frontend
npm install
ng serve
```

#Backend Commands (optional, outside Docker)
```
cd Backend
npm install
node app.js
```

#License 

This project is for educational purposes — customize it freely.