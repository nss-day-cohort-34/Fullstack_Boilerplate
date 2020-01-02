import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
//import BookDataManager from '../Books/BookDataManager'
import { register } from '../../API/userManager';

//import './Login.css';

class RegisterModal extends React.Component {
    state = {                     
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            modal: false,
            errors: []
        };


    submit = (event) => {
        event.preventDefault();
        const { firstName, lastName, username, email, password, confirmPassword } = this.state;
        register({
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
        })
        .then((user) => {
            this.props.onLogin(user);
            this.toggle()
            // const firstBookObject = {
            //                  userId: user.id,
            //                  title: "quotebook",
            //                  description: "we have created a quotebook for you, with inspiration for each day of the year.",
            //                  timestamp: new Date().toLocaleString(),
            //                  isBlank: false
            //              }
            //              BookDataManager.postBook(firstBookObject)
            //              .then(()=> {
            //                  alert("welcome to winnow. please sign in.")
            //                  
            //              })
            })
            .catch(err => {
            this.setState({ errors: err.messages });
            });
    }
    
    handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
        [name]: value,
    });   
    }

   
    //toggles modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    // createFirstBook = () => {

    //     //create first book for user, and post, then close modal.
    //         const firstBookObject = {
    //             userId: ,
    //             title: "quotebook",
    //             description: "we have created a quotebook for you, with inspiration for each day of the year.",
    //             timestamp: new Date().toLocaleString(),
    //             isBlank: false
    //         }
    //         BookDataManager.postBook(firstBookObject)
    //         .then(()=> {
    //             alert("welcome to winnow. please sign in.")
    //             this.toggle()
    //         })
    //     }


    render() {
        return (
            <div>
                <div className="registerbtn">
                    <Button onClick={this.toggle}>sign up</Button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <form onSubmit={this.submit}>                   
                    <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
                    <ModalBody>    
                    <ul>
                        {
                            this.state.errors ? this.state.errors.map((message, i) => (
                            <li key={i}>{message}</li>
                            )) : null
                        }
                    </ul>                    
                        <div>
                            <Input onChange={this.handleInputChange} 
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="first name"
                                    value={this.state.firstName}
                                    required
                                /><br/>
                            <Input onChange={this.handleInputChange} 
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="last name"
                                    value={this.state.lastName}
                                    required
                                    /><br/>
                            <Input onChange={this.handleInputChange} 
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    required
                                    autoFocus=""
                                    /><br/>
                            <Input onChange={this.handleInputChange} 
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="username"
                                    value={this.state.username}
                                    required
                                    /><br/>
                            <Input onChange={this.handleInputChange} 
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    required
                                    /><br/>
                            <Input onChange={this.handleInputChange} 
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="confirm password"
                                    required
                                />
                        </div>                      
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="submit"
                            primary
                            onClick={this.handleRegister}
                            >Sign up</Button>

                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default withRouter(RegisterModal);