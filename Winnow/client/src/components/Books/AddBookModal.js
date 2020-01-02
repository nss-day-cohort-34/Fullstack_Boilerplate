import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Icon, Button } from 'semantic-ui-react'
import { getUser } from '../../API/userManager';
//import '../Books/Card.css'

class AddBookModal extends Component {

//Defines initial state
    state = {
        books: [],
        title: "",
        description: "",
        timestamp: "",
        modal: false
    };


//Displays/hides the modal
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

    constructNewBook = () => {

    //Validates user input
        if (this.state.title === "") {
            alert("your new quotebook must have a title");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const newBook = {
                title: this.state.title,              
                description: this.state.description,               
                startsBlank: true
            };

        //posts the object to the database, gets all books updates state of books array
            this.props.addBook(newBook)

        //closes the modal
            .then(this.toggle)
        }
    };


    // clearDescriptionInState = () => {
    //     this.setState({
    //         description: ""
    //     })
    // }

    render(){
        return(
            <>
                <div className="addCard" onClick={() => this.toggle()}>
                    <div className="addCard__content">
                        <div
                            className="add__icon"
                            onClick={() => this.toggle}
                        >
                            <Icon
                                onClick={() => this.toggle}
                                className="addBookModal__button"
                                name="add"
                                size="large">
                            </Icon>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggle}>add book</ModalHeader>
                        <ModalBody>
                            <div className="newBookForm">
                                <Input
                                    onChange={this.handleFieldChange}
                                    type="text"
                                    id="title"
                                    placeholder="title"
                                    required
                                    autoFocus=""
                                    /><br/>
                                <Input onChange={this.handleFieldChange}
                                    type="textarea"
                                    id="description"
                                    placeholder="description"
                                    /><br/>
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button primary onClick={() => {
                                    this.constructNewBook()
                                    //this.clearDescriptionInState()
                            }}
                            >save</Button>
                            <Button onClick={this.toggle}>cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default AddBookModal

