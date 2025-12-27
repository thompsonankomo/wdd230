# Bulawayo Chamber of Commerce Backend

This project adds a backend server to the Bulawayo Chamber of Commerce website, allowing form submissions from the join page to be stored in a SQLite database.

## Setup

1. Ensure Node.js is installed.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the server.

The server will run on http://localhost:3000.

## Database

The application uses SQLite with a database file `chamber.db`. The table `applications` stores the form submissions.

## Usage

- Visit http://localhost:3000 to access the site.
- Submit the form on the join page; data will be saved to the database.
- After submission, users are redirected to a thank you page.

## Dependencies

- Express: Web framework
- SQLite3: Database
- Body-parser: Parse request bodies