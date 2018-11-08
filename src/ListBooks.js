import React, { Component } from 'react';
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
                        {this.props.shelves.map((shelf) => (
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">{shelf}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.props.books.map((book) => ( // TODO add filter() for shelf
                                            <li>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select>
                                                                <option value="move" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading</option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    <div className="book-authors">{book.authors[0]}</div>
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