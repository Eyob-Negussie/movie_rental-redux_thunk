import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveMovie } from "../services/movieService";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchGenres } from "../actions/genreActions";
import { fetchMovie } from "../actions/movieActions";
import store from "../store";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    selectedValue: "",
    genreOptions: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie && nextProps.movie._id) {
      const {
        _id,
        title,
        genre,
        numberInStock,
        dailyRentalRate
      } = nextProps.movie;

      const data = {
        _id: _id,
        title: title,
        genreId: genre._id,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate
      };

      const selectedValue = genre._id;
      const { genreOptions } = this.props;
      this.setState({ data, selectedValue, genreOptions });
    }
  }

  componentDidMount() {
    const { genres } = store.getState().genres;
    if (!genres.length) {
      this.props.fetchGenres();
    }

    const movieId = this.props.match.params.id;
    if (movieId === "new") {
      return;
    }

    this.props.fetchMovie(movieId);
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelectList(
            this.state.genreOptions,
            "genreId",
            "Genre",
            this.state.selectedValue
          )}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  genreOptions: state.genres.genres,
  movie: state.movies.movie
});

const mapDispatchToProps = dispatch => ({
  fetchGenres: bindActionCreators(fetchGenres),
  fetchMovie: bindActionCreators(fetchMovie)
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);
