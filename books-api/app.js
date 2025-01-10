// Import Express and body-parser
const express = require('express');
const bodyParser = require("body-parser");

// Instantiate the Express app
const app = express();

// Define the port
const port = 3000;

// Create in-memory data
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 3, title: 'Cocaine Cowboys II: Hustlin With the Godmother', author: 'Yénora'},
    { id: 4, title: 'Bluebeard', author: 'Mylène'},
    { id: 5, title: 'Last Circus, The (Balada triste de trompeta) (Sad Trumpet Ballad, A)', author: 'Maëlle'},
    { id: 6, title: 'Lady and the Reaper, The (Dama y la muerte, La)', author: 'Personnalisée'},
    { id: 7, title: 'Prospero Books', author: 'Gisèle'},
    { id: 8, title: 'Man on the Train (Homme du train, L)', author: 'Sélène'},
    { id: 9, title: 'Any Day Now', author: 'Mélys'},
    { id: 10, title: 'Big Hero 6', author: 'Torbjörn'},
    { id: 11, title: 'Chain Camera', author: 'Mahélie'},
    { id: 12, title: 'Panic', author: 'Uò'},
    { id: 13, title: 'Condemned, The', author: 'Annotée'},
    { id: 14, title: 'Semper Fi', author: 'André'},
    { id: 15, title: 'The Beautiful Story', author: 'Cécilia'}
];

// parse incoming JSON data in requests
app.use(express.json())
// Configure body-parser to handle URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true })); // Set extended: true for nested objects

// Define the routes
app.get('/books', (req, res) => {
    res.json(books); // Send the array of books as JSON response
});

// Implementing CRUD Operations
// Add the Route for Creating a Book (POST /books)
app.post('/books', (req, res) => {
    // Get the new book data from the request body
    const newBook = req.body;
    newBook.id = books.length + 1; // Assign a unique ID to the new book
    // Add the new book to the array
    books.push(newBook);
    // Send created book with status code 201 (Created)
    res.status(201).json(newBook);
});

// Route for Getting a Single Book (GET /books/:id)
app.get('/books/:id', (req, res) => {
    // Get book ID from URL parameters and convert to a number with parseInt
    const bookId = parseInt(req.params.id);
    // Use the find method on the books array to locate a book with the matching ID
    const book = books.find(book => book.id === bookId);
  
    if (book) {
      res.json(book); // Send the book data if found
    } else {
        // Send response with status code 404 (Not Found) & error message for non-existent book
        res.status(404).send('Book not found');
    }
    });

// Route for Updating a Book (PUT /books/:id)
app.put('/books/:id', (req, res) => {
    // Get book ID from URL parameters and convert to a number with parseInt
    const bookId = parseInt(req.params.id);
    // Get the updated book data from the request body
    const updatedBook = req.body;
    // Use the findIndex method on the books array to locate the book with the matching ID
    const index = books.findIndex(book => book.id === bookId);
  
    if (index !== -1) { // If book is found
        updatedBook.id = bookId;
        // Replace the book at the specified index with the updated book
        books[index] = updatedBook;
        // Send the updated book data with status code 200 (OK)
        res.json(updatedBook);
    } else {
        // Send response with status code 404 (Not Found) & error message for non-existent book
        res.status(404).send('Book not found');
    }});

// Route for Deleting a Book (DELETE /books/:id)
app.delete('/books/:id', (req, res) => {
    // Get book ID from URL parameters and convert to a number with parseInt
    const bookId = parseInt(req.params.id);
    // Use the findIndex method on the books array to locate the book with the matching ID
    const index = books.findIndex(book => book.id === bookId);
  
    if (index !== -1) { // If book is found
        // Remove the book from the array at the specified index
        books.splice(index, 1);
        // Send a success response with status code 204 (No Content)
        res.status(204).send();
    } else {
        // Send response with status code 404 (Not Found) & error message for non-existent book
        res.status(404).send('Book not found');
    }});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});