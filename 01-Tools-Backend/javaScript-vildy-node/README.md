Movies API
A simple REST API built with Node.js and Express that manages a list of movies stored in a local JSON file.
Project Structure
javascript-vilay-node/
├── node_modules/
├── data.json # Movie data storage
├── package-lock.json
├── package.json
├── README.md
└── server.js # Express server & routes
Getting Started
Install dependencies:
bashnpm install
Run the server:
bashnode server.js
Server will be available at http://localhost:3000

Endpoints
Get all movies
GET /movies
Response 200:
json[
{ "id": "1", "title": "The Godfather", "genre": "Crime", "year": 1972 }
]

Get movie by ID
GET /movies/:id
ParamTypeDescriptionidstringMovie ID
Response 200:
json{ "id": "1", "title": "The Godfather", "genre": "Crime", "year": 1972 }
Response 404: Movie not found

Create a movie
POST /movies
Body (JSON):
json{ "id": "7", "title": "The Matrix", "genre": "Sci-Fi", "year": 1999 }
Response 201: Returns the created movie.

Update a movie
PUT /movies/:id
ParamTypeDescriptionidstringMovie ID to update
Body (JSON):
json{ "title": "The Matrix Reloaded", "year": 2003 }
Response 200: Returns the updated movie.
Response 404: Movie not found

Delete a movie
DELETE /movies/:id
ParamTypeDescriptionidstringMovie ID to delete
Response 200: Returns the updated movie list.
Response 404: Movie not found

Error Responses
CodeMeaning400Bad request — missing body404Movie or route not found500Error reading/writing data.json

Tech Stack

Runtime: Node.js
Framework: Express
Storage: data.json (flat file, no database)
