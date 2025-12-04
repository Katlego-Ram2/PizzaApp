# React Native Inventory App

## Overview
This is a React Native Inventory Management App that lets users:
- View all inventory items
- Add new items
- Edit existing items
- Delete items

The app connects to a Node.js backend API.

---

## Features
- React Native UI
- React Navigation
- Axios API integration
- Full CRUD operations
- Loading states + alerts

---

## Project Setup

### 1. Install dependencies
npm install

### 2. Create .env file
API_URL=https://http://localhost:3000/api/

### 3. Start the project
npm start

---

## API File Setup
Edit: `src/services/api.ts`

Example:

import axios from "axios";
import { API_URL } from "@env";

export const api = {
  async getItem(id) {
    const r = await axios.get(`${API_URL}/items/${id}`);
    return r.data;
  },

  async createItem(data) {
    const r = await axios.post(`${API_URL}/items`, data);
    return r.data;
  },

  async updateItem(id, data) {
    const r = await axios.put(`${API_URL}/items/${id}`, data);
    return r.data;
  }
};

---

## Run on Android/iOS
npm run android  
npm run ios

---

# Inventory Backend API (Node.js + Express + MySQL)

## Overview
This backend provides REST API endpoints for the React Native Inventory App.

Features:
- Create items
- Read items
- Update items
- Delete items
- MySQL database

---

## Technologies
- Node.js
- Express.js
- MySQL
- Sequelize ORM

---

## Setup Instructions

### 1. Install dependencies
npm install

### 2. Create .env file
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=inventorydb
PORT=5000

### 3. Start MySQL and run:
CREATE DATABASE inventorydb;

### 4. Start the server
npm start

---

## API Endpoints

### GET /api/items
Fetch all items

### GET /api/items/:id
Fetch single item

### POST /api/items
Create item  
Body example:
{
  "name": "Tomatoes",
  "category": "Veg",
  "quantity": 10,
  "description": "Fresh"
}

### PUT /api/items/:id
Update item

### DELETE /api/items/:id
Delete item

---

## Folder Structure
/routes  
/models  
/config  
/server.js  

---

## Test with Postman
Base URL:
http://localhost:3000/api





## Build APK (optional)
eas build -p android
