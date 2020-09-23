import React from "react";
import axios from "axios";
import "./IssueDetailsPage.css";

export default class IssueDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(`props: ${JSON.stringify(props.match.params.number)}`);
    this.state = {
      url: `https://api.github.com/repos/angular/angular/issues/${props.match.params.number}`,
      //   url: "https://api.github.com/repos/angular/angular/issues/38436",
      data: {
        labels: []
      }
    };
  }

  async componentDidMount() {
    try {
      const get_api = this.state.url;
      const res = await axios.get(get_api);
      console.log(res.data);
      this.setState({
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container">
        <header>{this.state.data.title}</header>
        <div className="content">
          <main>
            <textarea
              readOnly
              value={this.state.data.body}
            />
          </main>
          <aside>
            <header>Issue Details</header>
            <ul>
              <li>
                <strong>Labels:</strong>
                <ul>
                  {this.state.data.labels.map((label) => <li>{label.name}</li>)}
                </ul>
              </li>
              <li>
                <strong>ID:</strong> {this.state.data.id}
              </li>
              <li>
                <strong>Number:</strong> {this.state.data.number}
              </li>
              <li>
                <strong>State:</strong> {this.state.data.state}
              </li>
              <li>
                <strong>Created_at:</strong> {this.state.data.created_at}
              </li>
              <li>
                <strong>Updated_at:</strong> {this.state.data.updated_at}
              </li>
            </ul>
          </aside>
        </div>
      </div>
    );
  }
}
