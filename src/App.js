import React, { Fragment, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Movie from "./components/movies";
import Navbar from "./components/navbar";
import Customer from "./components/customers";
import Rental from "./components/rentals";
import notFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Register from "./components/register";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import { getCurrentUser } from "./services/authService";
import store from "./store";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <Provider store={store}>
        <Fragment>
          <ToastContainer />
          <Navbar user={this.state.user} />
          <main className="margin-top-20 container">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={Register} />
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={props => <Movie {...props} user={user} />}
              />
              <Route path="/customers" component={Customer} />
              <Route path="/rentals" component={Rental} />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={notFound} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
