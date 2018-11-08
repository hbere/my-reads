import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBook from './ListBook.js'

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
                            <div className="bookshelf" key={shelf.id}>
                                <h2 className="bookshelf-title">{shelf.label}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.props.books.filter(book => book.shelf === shelf.id).map((book) => (
                                            <ListBook key={book.id} book={book} shelves={this.props.shelves} />
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