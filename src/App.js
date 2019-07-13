import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelfBooks from './ShelfBooks'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books }) //shortcut for books:books
    })
  }

  updateBook = (book, shelf) => {
    console.log('updateBook: ', book, shelf)
    let prevState = JSON.parse(JSON.stringify(this.state.books))
    console.log('updateBook: prevState: ', prevState);
    let newState = prevState.map((bk) => (
      bk.id === book.id ? { ...bk, shelf: shelf } : bk
    ))
    console.log('updateBook: newState: ', newState);
    this.setState({ books: newState })

    // update the backend database
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ShelfBooks
                      books={this.state.books}
                      shelf={'currentlyReading'}
                      onUpdateBook={this.updateBook}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ShelfBooks
                      books={this.state.books}
                      shelf={'wantToRead'}
                      onUpdateBook={this.updateBook}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ShelfBooks
                      books={this.state.books}
                      shelf={'read'}
                      onUpdateBook={this.updateBook}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
