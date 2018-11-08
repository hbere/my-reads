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
      { id: 'read', label: 'Read' }
      // ,
      // { id: 'none', label: 'None' },
    ],
    lastSearch: ''
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      // console.log(this.state.books)
    })
  }

  searchBooks = (query) => {
    // console.log(query);
    BooksAPI.search(query)
      .then(function (result) {
        return result;
      }).then(function (resultText) {
        console.log(resultText);
      })
  }

  updateShelves = (book, event) => {
    let newShelf = event.target.value;
    // Update database
    BooksAPI.update(book, newShelf)
      .then(() => {
        // Return updated book list from API
        // TODO for efficiency make this update locally because do not have to pull all data again here
        return BooksAPI.getAll();
      }).then((books) => {
        // Re-render page
        this.setState({ books })
        this.render();
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            onType={(query) => {
              this.searchBooks(query)
            }}
          />
        )} />
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            shelves={this.state.shelves}
            onShelfMove={(book, event) => {
              this.updateShelves(book, event)
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
