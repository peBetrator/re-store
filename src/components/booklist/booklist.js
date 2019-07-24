import React, { Component } from "react";
import BookListItem from "../booklist-item";
import { connect } from "react-redux";

import { withBookstoreService } from "../hoc";
import { booksLoaded } from "../../actions";
import { compose } from "../../utils";

class BookList extends Component {
  componentDidMount() {
    const { bookStoreService } = this.props;
    const data = bookStoreService.getBooks();

    this.props.booksLoaded(data);
  }

  render() {
    const { books } = this.props;
    return (
      <ul>
        {books.map(book => {
          return (
            <li key={book.id}>
              <BookListItem book={book} />
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = { booksLoaded };

export default compose(
  withBookstoreService(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BookList)
);
