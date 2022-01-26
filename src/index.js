import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './components/App/App'
import './components/FilmCard/FilmCard.css';
import './components/App/App.css';
import './components/FilmCardList/FilmCardList.css';


const root = document.querySelector('.root');

async function apiResurses() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=90d5e20a86b4ddbdf3739dbeffe07279`)
    return await res.json()
}

















class Logical {

}

ReactDOM.render(< App apiResurses = {apiResurses}/>, root);



