import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf.js'
import SearchBooks from './Search.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        {/* Formerly this.state.showSearchPage === true */}
        <Route exact path='/search' render={() => (
          <SearchBooks />
        )} />
        {/* Formerly this.state.showSearchPage === false */}
        <Route exact path='/' render={() => (
          <Bookshelf />
        )} />
      </div>
    )
  }
}

export default BooksApp
