import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
                        <input
                            id="bookSearchBox"
                            type="text"
                            placeholder="Search by title or author"
                            onChange={() => this.props.onSearch(document.getElementById('bookSearchBox').value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.searchResults.map((book) => (
                            <li id={book.id} key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        {(typeof book.imageLinks !== 'undefined' && typeof book.imageLinks.thumbnail !== 'undefined' && book.imageLinks.thumbnail.length > 0) ?
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div> :
                                            <div className="book-cover" style={{ width: 128, height: 193 }}>[book cover unavailable]</div>
                                        }
                                        <div className="book-shelf-changer">
                                            <select value="none" onChange={(event) => this.props.onShelfMove(book.id, event)}>
                                                <option value="move" disabled>Move to...</option>
                                                {this.props.shelves.map((shelf) => (
                                                    <option value={shelf.id} key={shelf.id}>{shelf.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    {(typeof book.title !== 'undefined' && book.title.length > 0) ?
                                        <div className="book-title">{book.title}</div> :
                                        <div className="book-title">[book title unknown]</div>
                                    }
                                    {(typeof book.authors !== 'undefined' && book.authors.length > 0) ?
                                        book.authors.map((author) => (
                                            <div className="book-authors" key={book.id + ',' + author}>{author}</div>
                                        ))
                                        : < div className="book-authors">[author unknown]</div>
                                    }
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks