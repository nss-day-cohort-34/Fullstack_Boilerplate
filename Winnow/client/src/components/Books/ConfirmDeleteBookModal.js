import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Icon, Button } from 'semantic-ui-react'

class ConfirmDeleteBookModal extends Component {

//Defines initial state
    
        state = {
            books: [],          
            title: "",
            description: "",
            timestamp: "",
            modal: false
        };


//Displays/hides the new article modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    render(){
        return(
            <>
                <section>
                    <Icon
                        className="delete__icon"
                        name="delete"
                        onClick={this.toggle}
                        size="large"
                    >
                    </Icon>
                </section>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>confirm delete</ModalHeader>
                        <ModalBody>
                            <div className="confirm__message">
                                <h4>are you sure you want to delete this book?</h4>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                negative
                                onClick={()=>{
                                    this.props.removeBook(this.props.book.id)
                                    this.toggle()
                                }}>delete</Button>
                            <Button

                                onClick={this.toggle}
                            >cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default ConfirmDeleteBookModal