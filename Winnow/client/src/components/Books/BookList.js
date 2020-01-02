// import React, { Component } from "react";
// import BookCard from "./BookCard";
// import BookDataManager from "./BookDataManager";
// import AddBookModal from "./AddBookModal";
// import './BookList.css'
// import { getUser } from "../../API/userManager";



// class BookList extends Component {
//   //Defines initial state
//   state = {
//     books: [],
//     description: "",
//     userId: getUser().id,
//     months: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
//     currentMonth: "",
//     currentDate: "",
//     fadeIn: true
//   };

//   //When component mounts, get all user's books and set state of with all existsing books
//   componentDidMount() {
//     const d = new Date();
//     BookDataManager.getAllBooks(this.state.userId).then(books => {
//         this.setState({
//           books: books,
//           currentMonth: this.state.months[d.getMonth()],
//           currentDate: d.getDate().toString()
//         });
//         console.log(this.state.currentMonth, this.state.currentDate)
//       });
//     };

//   // post a new book object to database and update state (called in AddBookModal)
//   addBook = bookObject => {
//     return BookDataManager.postBook(bookObject)
//         .then(() => {
//             BookDataManager.getAllBooks(this.state.userId)
//                 .then(books => {
//                     this.setState({
//                         books: books
//           });
//         });
//       });
//     };


//   // delete book object from database and update state (called in ConfirmDeleteBookModal)
//   removeBook = id => {
//     BookDataManager.deleteBook(id)
//         .then(() => {
//             BookDataManager.getAllBooks(this.state.userId)
//                 .then(books => {
//           this.setState({
//             books: books
//           });
//         });
//       });
//   };

//   // post edited object to database and update state
//   putEditedBook = id => {
//     return BookDataManager.editBook(id).then(() => {
//       BookDataManager.getAllBooks(this.state.userId)
//         .then(books => {
//           this.setState({
//             books: books
//           });
//         });
//       });
//   };




//   render() {
//     return (
//       <React.Fragment>
//         <div className="bookList__container">

//               <div className="bookList__header">
//                 <h1>my books</h1>
//               </div>

//               <div className="bookList__contents">
//                 {this.state.books.map(book => {
//                   return (

//                         <BookCard
//                           key={book.id}
//                           book={book}
//                           removeBook={this.removeBook}
//                           currentMonth = {this.state.currentMonth}
//                           currentDate = {this.state.currentDate}
//                           putEditedBook={this.putEditedBook}
//                           {...this.props}
//                         />

//                   )
//                 })}

//                   <AddBookModal

//                     {...this.props}
//                     addBook={this.addBook}
//                   />

//               </div>

//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default BookList;
