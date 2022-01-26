import React, { Component } from 'react';
import { Input } from 'antd';
import FilmCardList from '../FilmCardList/FilmCardList'








export default class App extends Component {




    render() {



        return (
            <main className="filmCardList">
                <Input placeholder="Search" />
                < FilmCardList apiResurses={this.props.apiResurses} />
            </main>


        );
    }
}


