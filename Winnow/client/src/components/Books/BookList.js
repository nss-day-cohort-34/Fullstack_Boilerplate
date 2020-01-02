import React, { Component } from "react";
import BookCard from "./BookCard";
import BookManager from "../../API/BookManager";
import AddBookModal from "./AddBookModal";
//import '../Styles/BookList.css'
import { getUser } from "../../API/userManager";



class BookList extends Component {
  //Defines initial state
  state = {
    books: [],
    description: "",   
    months: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    currentMonth: "",
    currentDate: "",
    fadeIn: true
  };

  //When component mounts, get all user's books and set state of with all existsing books
  componentDidMount() {
    const d = new Date();
    BookManager.getAllBooks().then(books => {
        this.setState({
          books: books,
          currentMonth: this.state.months[d.getMonth()],
          currentDate: d.getDate().toString()
        });
        console.log(this.state.currentMonth, this.state.currentDate)
      });
    };

  // post a new book object to database and update state (called in AddBookModal)
  addBook = newBook => {
    return BookManager.postBook(newBook)
        .then(() => {
            BookManager.getAllBooks()
                .then(books => {
                    this.setState({
                        books: books
          });
        });
      });
    };


  // delete book object from database and update state (called in ConfirmDeleteBookModal)
  removeBook = id => {
    BookManager.deleteBook(id)
        .then(() => {
            BookManager.getAllBooks()
                .then(books => {
          this.setState({
            books: books
          });
        });
      });
  };

  // post edited object to database and update state
  putEditedBook = editedBook => {
      console.log(editedBook.id, editedBook)
    return BookManager.editBook(editedBook.id, editedBook)
    .then(() => {
      BookManager.getAllBooks()
        .then(books => {
          this.setState({
            books: books
          });
        });
      });
  };




  render() {
    return (
      <React.Fragment>
        <div className="bookList__container">

              <div className="bookList__header">
                <h1>my books</h1>
              </div>

              <div className="bookList__contents">
                {this.state.books.map(book => {
                  return (

                    <BookCard
                        key={book.id}
                        book={book}
                        removeBook={this.removeBook}
                        currentMonth = {this.state.currentMonth}
                        currentDate = {this.state.currentDate}
                        putEditedBook={this.putEditedBook}
                        {...this.props}
                    />

                  )
                })}

                  <AddBookModal

                    {...this.props}
                    addBook={this.addBook}
                  />

              </div>

        </div>
      </React.Fragment>
    );
  }
}

export default BookList;
