import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf.js'
import SearchBooks from './Search.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO consider whether need to track state (mutable info) here at all
     */
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks />
        )} />
        <Route exact path='/' render={() => (
          <Bookshelf />
        )} />
      </div>
    )
  }
}

export default BooksApp
