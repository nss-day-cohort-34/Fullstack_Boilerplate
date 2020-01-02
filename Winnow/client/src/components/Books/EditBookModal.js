import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Icon, Button } from 'semantic-ui-react'
import BookDataManager from '../../API/BookManager'

class BookEditModal extends Component {

//Defines initial state
    state = {
        books: [],
        title: "",
        description: "",
        creationDate: "",
        loadingStatus: false,
        modal: false
    };  

//Displays/hides the edit modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

//Sets state with input values as fields change
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };


    editBook = () => {
    //Validates user input
        if (this.state.title === "") {
            alert("please fill out all fields");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited book
            const editedBook = {
                id: this.props.book.id,               
                title: this.state.title,
                description: this.state.description,              
            };
        //puts the object to the database
            this.props.putEditedBook(editedBook)
        //closes the modal
            .then(this.toggle)
        }
    }


//Gets the book object that is being edited and sets state to populate the input fields
    componentDidMount() {
        BookDataManager.getBook(this.props.book.id)
        .then(book => {
            this.setState({
            title: book.title,
            description: book.description,
            creationDate: book.creationDate,
            startsBlank: book.startsBlank           
            });
        });
    }

    render(){
        return(
            <>
                <section className="bookSectionContent">
                <Icon
                    type="button"
                    onClick={this.toggle}
                    name='edit outline'
                    size="large"
                >
                </Icon>
                </section>
                <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                className={this.props.className}
            >
                    <ModalHeader toggle={this.toggle}>edit book</ModalHeader>
                    <ModalBody>

                                <div className="editBookForm">
                                    <Input

                                        onChange={this.handleFieldChange}
                                        type="text"
                                        id="title"
                                        value={this.state.title}
                                        required
                                        autoFocus=""
                                    /><br/>
                                    <Input
                                        onChange={this.handleFieldChange}
                                        type="textarea"
                                        id="description"
                                        value={this.state.description}
                                        required
                                    /><br/>
                                </div>

                    </ModalBody>
                <ModalFooter>
                    <Button primary type="button" onClick={this.editBook}>save</Button>{' '}
                    <Button type="button" onClick={this.toggle}>cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        </>
        )
    }
}

export default BookEditModal