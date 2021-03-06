import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './components/App/App'
import './components/FilmCard/FilmCard.css';
import './components/App/App.css';
import './components/FilmCardList/FilmCardList.css';
import './components/FilmCard/FilmCardGenre/FilmCardGenre.css';

const root = document.querySelector('.root');

ReactDOM.render(< App />, root);
