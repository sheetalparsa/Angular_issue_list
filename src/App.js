import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import "./App.css";
import logo from "./image3.png";

import IssueListPage from "./IssueListPage";
import IssueDetailsPage from "./IssueDetailsPage";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  async componentDidMount() {
    try {
      const get_api = "https://api.github.com/repos/angular/angular";
      const res = await axios.get(get_api);
      console.log(res.data.body);
      this.setState({
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="home-page">
        <header>
          <div className="repo-title">
            <a href={this.state.data.html_url}><img src={logo} alt="github logo"></img></a>
            <h3>Angular Repository Issues</h3>
          </div>
          {/* <span>
            <strong>FullName: </strong>
            {this.state.data.full_name}{" "}
          </span>
          <span>
            <strong>Private: </strong>
            {String(this.state.data.private)}{" "}
          </span> */}
          <div className="repo-info">
            <span>
              <a href={this.state.data.html_url}>{this.state.data.full_name}</a>
              <strong> | </strong>
              <strong>Open Issues: </strong>
              {this.state.data.open_issues}
              <strong> | </strong>
              <strong>Forks: </strong>
              {this.state.data.forks}
              <strong> | </strong>
              <strong>Watchers: </strong>
              {this.state.data.watchers}
            </span>
          </div>
        </header>
        {/* <div className="angular">
          <br />
          <a href="https://github.com/angular">angular / </a><a href="https://github.com/angular/angular">angular </a>
        </div> */}
        <main>
          <Switch>
            <Route path="/" component={IssueListPage} exact />
            <Route path="/issues/:number" component={IssueDetailsPage} />
          </Switch>
        </main>
      </div>
    );
  }
}
