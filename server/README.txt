Welcome to the documentation for Pete Cooke's book API

To run the api from a command line
1) Change directory (cd) into the BookAPI/server folder.
2) Run 'npm run start'.
*if you do not have the node package manager (npm) installed please visit https://nodejs.org/
*if you require SQLite then please visit https://www.sqlite.org/download.html

The api offers the following endpoints; at localhost:9000.

GETS
/ = home.
/books = retrieve all books.
/books/id = retrieve a book by id.

The api supports query strings for the get request in the format:
http://localhost:9000/books?author=authorName&year=YYYY&publisher=publisherName

POSTS
/books = add a new book.

PATCHES
/books = update an entry.

DELETES
/books/id = delete a book by id,

Please note when running the api for the first time the database is initialised with
two entries of books I have written which are available from amazon.

All feedback is warmly welcomed to peterjamescooke@gmail.com.
Have a great day.
