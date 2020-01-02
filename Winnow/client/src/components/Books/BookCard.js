import React, { Component } from 'react'
import EditBookModal from './EditBookModal.js'
import { Button, Transition } from 'semantic-ui-react'
// import PageDataManager from '../Pages/PageDataManager'
// import QuoteDataManager from '../Quotes/QuoteDataManager'
import ConfirmBookDeleteModal from './ConfirmDeleteBookModal'
// import './Card.css'

class BookCard extends Component {
    state = {
        pages: [],
        pageId: 0,
        description: "",
        display: "hide",
        visible: false
    }

//   constructOrNavigateToFirstPage = () => {
// //Validates user input
//         PageDataManager.checkPages(this.props.book.id, this.props.currentMonth, this.props.currentDate)
//             .then(pages => {
//                 if (pages.length > 0) {
//                     console.log("navigating to", this.props.currentMonth, this.props.currentDate)
//                     this.setState({
//                         pages: pages,
//                         pageId: pages[0].id
//                     })
//                     this.props.history.push(`/books/${this.props.book.id}/${this.state.pageId}/${this.props.currentMonth}/${this.props.currentDate}`)
//                 } else {
//                     console.log("creating page for", this.props.currentMonth, this.props.currentDate)
//                 //creates a new object for the new page,
//                     const newPage = {
//                         userId: parseInt(sessionStorage.getItem("credentials")),
//                         bookId: this.props.book.id,
//                         month: this.props.currentMonth,
//                         day: this.props.currentDate,
//                         thought: ""
//                     };
//                     console.log("created", newPage)
//                     //posts the object to the database, updates pageId in state
//                     PageDataManager.postPage(newPage)
//                         .then(page => {
//                             console.log(page)
//                             this.setState({
//                                 pageId: page.id
//                             })
//                             console.log("pageId for new page:", this.state.pageId)
//                         //then get a random quote
//                             if (this.props.book.isBlank === false) {
//                                 QuoteDataManager.getRandomQuote()

//                         //then post quote for that page
//                                 .then(quote => {
//                                     console.log("random quote", quote.quoteText)
//                                     const initialQuote = {
//                                         userId: parseInt(sessionStorage.getItem("credentials")),
//                                         bookId: this.props.book.id,
//                                         quoteText: quote.quoteText,
//                                         quoteAuthor: quote.quoteAuthor,
//                                         timestamp: new Date().toLocaleString()
//                                     };
//                                     QuoteDataManager.postQuote(initialQuote)
//                                         .then(quote => {
//                                             console.log("posted", quote)
//                                     //construct a new pageQuote object
//                                         const newPageQuote = {
//                                             quoteId: quote.id,
//                                             pageId: this.state.pageId,
//                                             bookId: this.props.book.id
//                                         }
//                                     //post the new pageQuote to the database
//                                         QuoteDataManager.savePageQuote(newPageQuote)
//                                         })
//                                         .then(() => {
//                                             console.log("pushing...")
//                                             this.props.history.push(`/books/${this.props.book.id}/${this.state.pageId}/${this.props.currentMonth}/${this.props.currentDate}`)
//                                         })
//                                 })

//                             } else {
//                                 console.log("pushing...")
//                                 this.props.history.push(`/books/${this.props.book.id}/${this.state.pageId}/${this.props.currentMonth}/${this.props.currentDate}`)
//                             }
//                         })
//                 }
//             })
//     }

    toggle = () => {
        this.setState(state => ({ visible: !state.visible }))
        console.log(this.state.visible);
      }

  render() {
    return (

        <div className="bookCard">
        <button onClick={this.toggle}>edit or delete</button>
                 <Transition animation="horizontal flip" visible={this.state.visible}>
                    <div className="bookEditAndDelete">
                        <ConfirmBookDeleteModal {...this.props}/> 
                        <EditBookModal
                            {...this.props}
                            putEditedBook={this.props.putEditedBook}
                        />
                    </div>
                </Transition>
                        <div className="card__title"
                        >
                            <h2>{this.props.book.title}</h2>
                            <div>
                                <Button
                                    // onClick={this.constructOrNavigateToFirstPage}
                                    icon="chevron right"
                                    size="mini"
                                >
                                </Button>
                            </div>
                        </div>

                    <div className="book__description">
                        <h4><em>{this.props.book.description}</em></h4>
                    </div>
            </div>

    );
  }
}

export default BookCard
