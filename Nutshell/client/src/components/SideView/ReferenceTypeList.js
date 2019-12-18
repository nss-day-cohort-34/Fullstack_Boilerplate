import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Icon, Accordion } from 'semantic-ui-react';
import { getReferences, getReferenceTypes } from '../../API/referenceManager';
import "./ReferenceTypeList.css"



//Rework this file (copy of Home.js) to do crud functionality on songs.

class ReferenceList extends Component {

    state = {
        activeIndex: 0
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    render() {
        const { activeIndex } = this.state

        if (this.props.references.length === 0) {
            return <></>
        }
        else {
            return (
                <>

                    <Button className="createButton" onClick={() => { this.props.history.push(`/home/references/create`) }}><Icon name="add" /></Button>
                    {this.props.referenceTypes.map(referenceType => {
                        const references = []
                        const i = referenceType.id

                            this.props.references.forEach(ref => {
                                if (ref.typeOfReferenceId === referenceType.id) {
                                    references.push(ref)
                                }
                            });

                            console.log(references)
                            return (

                                <Accordion className="referenceTypeList" key={referenceType.id}>
                                    <Accordion.Title
                                        active={activeIndex === i}
                                        index={i}
                                        onClick={this.handleClick}
                                    >
                                        <Icon name='dropdown' />
                                        {referenceType.name}
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === i}>
                                        {references.map(r => {
                                            console.log(r)
                                            return (
                                                <div className="referenceList" key={r.id}>
                                                    <Link
                                                        to={`/home/references/${r.id}`}>
                                                        {r.name}
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </Accordion.Content>
                                </Accordion>


                            )
                    })}

                </>
            )
        }
    }
}

export default ReferenceList;