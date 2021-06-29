const { request } = require("express");
const express = require("express");

//Database
const database = require("./database");


//Initializzation
const booky = express();

// configuration
booky.use(express.json());

/*
route             /
description       Get all books
access            Public
params            None
methods           Get
*/        


//where is the data??
booky.get("/", (req, res)=>{
    // change this line
    return res.json({books: database.books});
});

/*
route             /is
description       Get specific books based on ISBN
access            Public
params            isbn
methods           Get
*/     

booky.get("/is/:isbn",(req, res) =>{
    const getSpecificBook = database.books.filter(
        (book)=> book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0){
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}`,
    });
    }

    return res.json({book: getSpecificBook});
});

/*
route             /c
description       Get all books based on category
access            Public
params            category
methods           Get
*/     

booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter((book) =>
     book.category.includes(req.params.category)
     );

     if(getSpecificBook.length === 0){
        return res.json({ error: `No book found for the category of ${req.params.category}`,
    });
    }

    return res.json({book: getSpecificBook});

});

/*
route             /language
description       Get all books based on language
access            Public
params            language
methods           Get
*/     

booky.get("/language", (req, res) => {
    const getSpecificLanguage = database.language.filter((language) =>
     book.language.includes(req.params.language)
     );

     if(getSpecificLanguage.length === 0){
        return res.json({ error: `No book found for the language of ${req.params.language}`,
    });
    }

    return res.json({book: getSpecificLanguage});

});


/*
route             /author
description       Get all authors
access            Public
params            none
methods           Get
*/   

booky.get("/author", (req, res) => {
    return res.json({authors: database.author });
});

/*
route             /author/bok
description       Get all authors based on book
access            Public
params            isbn
methods           Get
*/     

booky.get("/author/book/:isbn", (req, res) =>{
    const getSpecificAuthor = database.author.filter((author) =>
     author.books.includes(req.params.isbn)
     );

     if(getSpecificAuthor.length === 0){
        return res.json({ error: `No Author found for the book of ${req.params.isbn}`,
    });
    }

    return res.json({authors: getSpecificAuthor });

});

/*
route             /pblication
description       Get all publication
access            Public
params            none
methods           Get
*/ 

booky.get("/publications", (req, res) => {
    return res.json({publications: database.publication});
});

/*
route             /book/add
description       add new book
access            Public
params            none
methods           post
*/ 

booky.post("/book/add", (req, res) => {
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books});
});


/*
route             /author/add
description       add new author
access            Public
params            none
methods           post
*/ 
booky.post("/author/add", (req, res) => {
    const {newAuthor} = req.body;
    database.author.push(newAuthor);
    return res.json({ authors: database.author});
});
    
/*
route             /book/update/title
description       update new book title
access            Public
params            none
methods           post
*/ 

booky.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    });

    return res.json({books: database.books});
});

/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    // update book database
  
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        return book.author.push(parseInt(req.params.authorId));
      }
    });
  
    // update author database
  
    database.author.forEach((author) => {
      if (author.id === parseInt(req.params.authorId))
        return author.books.push(req.params.isbn);
    });
  
    return res.json({ books: database.books, author: database.author });
  });
  
  booky.listen(3000, () => console.log("HEy server is running! 😎"));
  
  // HTTP client -> helper who helps you to make http request