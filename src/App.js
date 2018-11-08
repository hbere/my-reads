import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
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
          <ListBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
