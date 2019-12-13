import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

//Rework this file (copy of Home.js) to do crud functionality on songs.

class TitleList extends Component {


    render() {
        if (this.props.titles.length === 0) {
            return <></>
        }
        else {
            return (
                <>

                    {this.props.titles.map(title => {
                        return (
                            <div>
                                {title.name}
                            </div>
                        )
                    })}

                </>
            )
        }
    }
}

export default TitleList;