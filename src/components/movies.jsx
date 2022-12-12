import React, { Component, Fragment } from "react";
import { deleteMovie } from "../services/movieService";
import { fetchGenres } from "../actions/genreActions";
import { fetchMovies } from "../actions/movieActions";
import MoviesTable from "./MoviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import store from "../store";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title" }
  };

  componentDidMount() {
    const { genres } = store.getState().genres;
    if (!genres.length) {
      this.props.fetchGenres();
    }

    this.props.fetchMovies();
  }

  handleDelete = async movie => {
    const originalMovies = this.props.movies;

    try {
      await deleteMovie(movie._id);
      const movies = originalMovies.filter(m => m._id !== movie._id);
      this.setState({ movies });
    } catch (error) {
      toast.error("This moive has been deleted");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.props.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: ""
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ selectedGenre: null, searchQuery: query, currentPage: 1 });
  };

  render() {
    if (!this.props.movies) {
      return <p>There are no movies in the database</p>;
    }

    const {
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    const allMovies = this.props.movies;

    const user = this.props.user;

    let filteredMovies = allMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filteredMovies =
        selectedGenre && selectedGenre._id
          ? allMovies.filter(movie => movie.genre.genre === selectedGenre.genre)
          : allMovies;
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);
    const genres = [{ _id: "", genre: "All Genres" }, ...this.props.genres];
    return (
      <Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col">
            {user && (
              <Link
                className="btn btn-primary"
                id="new-movie-button"
                to="/movies/new"
              >
                New Movie
              </Link>
            )}
            <p>Showing {filteredMovies.length} movies in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={filteredMovies.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log("state", state);
  return {
    genres: state.genres.genres,
    movies: state.movies.movies
  };
};

export default connect(
  mapStateToProps,
  { fetchGenres, fetchMovies }
)(Movies);
