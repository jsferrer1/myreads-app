import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

class ShelfBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  render() {
    const { books, shelf, onUpdateBook } = this.props
    const { query } = this.state

    let showingBooks
    if (shelf) {
      const match = new RegExp(escapeRegExp(shelf))
      showingBooks = books.filter((book) => match.test(book.shelf))
    } else {
      showingBooks = books
    }

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {showingBooks.map((book) => (
            <li key={book.id} className='book-item'>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.thumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select
                      value={shelf}
                      onChange={(event) => onUpdateBook(book, event.target.value)}
                    >
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
    )
  }
}

export default ShelfBooks
