# Expence Tracker Application

This is an expence tracking app built with Express.js and EJS templates. It allows users to keep track their expenses. Users can also add, update, and delete them.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)

## Installation

To install and run the app locally, follow these steps:

1. Clone this repository
2. Install dependencies: `npm install`
3. Create a .env file in the root directory and add the necessary environment variables:
   SESSION_SECRET=<a random secret>
   MONGO_URI=<the URI of a mongo database>
4. Start the app: `npm start`

## Usage

Once the app is running, you can access it by visiting `http://localhost:3000` in your browser. From there, you can create a new expense, view all expenses, update an existing expenses, or delete them.

## Technologies

This app was built with the following technologies:

- MongoDB
- Express
- EJS
- Node.js
