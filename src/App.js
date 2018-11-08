import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    shelves: [ // TODO find way to handle dynamically
      { id: 'currentlyReading', label: 'Currently Reading' },
      { id: 'wantToRead', label: 'Want to Read' },
      { id: 'read', label: 'Read' },
      { id: 'none', label: 'None' },
    ]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(this.state.books)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks books={this.state.books} />
        )} />
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} shelves={this.state.shelves} />
        )} />
      </div>
    )
  }
}

export default BooksApp
