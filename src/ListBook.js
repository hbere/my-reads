import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class ListBook extends Component {

    handleShelfMove = (book, event) => {
        let newShelf = event.target.value;
        // Update database
        BooksAPI.update(book, newShelf)
            .then((response) => {
                console.log(response);
                ListBook.render();
            })
        // Re-render page
    }

    render() {
        let book = this.props.book;

        return (
            <li key={book.id} id={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(event) => this.handleShelfMove(book, event)}>
                                <option value="move" disabled>Move to...</option>
                                {this.props.shelves.map((shelf) => (
                                    <option value={shelf.id} key={shelf.id}>{shelf.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors.map((author) => (
                        <div className="book-authors" key={book.id + ',' + author}>{author}</div>
                    ))}
                </div>
            </li>)
    }
}

export default ListBook