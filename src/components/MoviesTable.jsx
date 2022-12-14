import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.genre", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like onLike={this.props.onLike} movie={movie} liked={movie.liked} />
      )
    }
  ];

  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push({
        key: "delete",
        content: movie => (
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger"
          >
            Delete
          </button>
        )
      });
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
