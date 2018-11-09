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
      { id: 'currentlyReading', label: 'Currently Reading', visibleShelf: true },
      { id: 'wantToRead', label: 'Want to Read', visibleShelf: true },
      { id: 'read', label: 'Read', visibleShelf: true },
      { id: 'none', label: 'None', visibleShelf: false }
    ],
    searchResults: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
      // console.log(this.state.books)
    })
  }

  searchBooks = (query) => {
    // console.log(query);
    // Search via API
    if (typeof query !== 'undefined' && query.length > 0) {
      BooksAPI.search(query).then((searchResults) => {
        if (typeof searchResults !== 'undefined' && searchResults.error !== 'empty query') { // if search results defined and nonempty
          searchResults.forEach((result, index) => {
            // if book id is in books use books value, otherwise use 'none'
            // console.log(this.state.books.filter(book => book.id === result.id)[0].shelf);
            searchResults[index].shelf =
              (this.state.books.filter(book => book.id === result.id).length === 1
                ? this.state.books.filter(book => book.id === result.id)[0].shelf
                : 'none'
              );
          }); // ...add shelf attribute...
          this.setState({ searchResults: searchResults }); // ...and set state.
        } else {
          // console.log(searchResults);
          this.setState({ searchResults: [] });
        }
      })
    } else {
      // console.log("no results shown");
      this.setState({ searchResults: [] });
    }
  }

  updateShelves = (bookId, event) => {
    let newShelf = event.target.value;
    // Update database
    BooksAPI.get(bookId).then((book) =>
      BooksAPI.update(book, newShelf)
    )
      .then(() => {
        // Return updated book list from API
        // TODO for efficiency make this update locally because do not have to pull all data again here
        return BooksAPI.getAll();
      }).then((books) => {
        this.setState({ books: books })
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            shelves={this.state.shelves}
            searchResults={this.state.searchResults}
            onSearch={(query) => {
              this.searchBooks(query)
            }}
            onShelfMove={(bookId, event) => {
              this.updateShelves(bookId, event)
            }}
          />
        )} />
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            shelves={this.state.shelves}
            onShelfMove={(bookId, event) => {
              this.updateShelves(bookId, event)
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
