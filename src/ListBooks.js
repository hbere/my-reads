import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.props.shelves.filter(shelf => shelf.visibleShelf === true).map((shelf) => (
                            <div className="bookshelf" key={shelf.id}>
                                <h2 className="bookshelf-title">{shelf.label}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.props.books.filter(book => book.shelf === shelf.id).map((book) => (
                                            <li id={book.id} key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        {(typeof book.imageLinks !== 'undefined' && typeof book.imageLinks.thumbnail !== 'undefined' && book.imageLinks.thumbnail.length > 0)
                                                            ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                            : <div className="book-cover" style={{ width: 128, height: 193 }}>[book cover unavailable]</div>
                                                        }
                                                        <div className="book-shelf-changer">
                                                            <select value={book.shelf} onChange={(event) => this.props.onShelfMove(book.id, event)}>
                                                                <option value="move" disabled>Move to...</option>
                                                                {this.props.shelves.map((shelf) => (
                                                                    <option value={shelf.id} key={shelf.id}>{shelf.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {(typeof book.title !== 'undefined' && book.title.length > 0)
                                                        ? <div className="book-title">{book.title}</div>
                                                        : <div className="book-title">[book title unknown]</div>
                                                    }
                                                    {(typeof book.authors !== 'undefined' && book.authors.length > 0)
                                                        ? book.authors.map((author) => (
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
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link className="open-search" to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks