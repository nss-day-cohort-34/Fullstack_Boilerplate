import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import "./TitleList.css"
 

//Rework this file (copy of Home.js) to do crud functionality on songs.

class TitleList extends Component {


    render() {
        if (this.props.titles.length === 0) {
            return (
            <>
                <Button className="createButton" onClick={() => { this.props.history.push(`/home/titles/create`) }}><Icon name="add" /></Button>
            </>
            )
        }
        else {
            return (
                <>

                    <Button className="createButton" onClick={() => { this.props.history.push(`/home/titles/create`) }}><Icon name="add" /></Button>
                    {this.props.titles.map(title => {
                        return (
                            <div className="titleList" key={title.id}>
                                <Link
                                    to={`/home/titles/${title.id}`}>
                                    {title.name}
                                </Link>
                            </div>
                        )
                    })}

                </>
            )
        }
    }
}

export default TitleList;