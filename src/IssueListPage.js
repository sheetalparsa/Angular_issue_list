import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./IssueListPage.css";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      lastPage: 1,
      searchText: "",
      items: [
        {
          title: "Sample Issue",
          number: 83098,
          url: "",
        },
      ],
    };
  }

  async search() {
    try {
      const get_api = this.getUrlByPage(1);
      const res = await axios.get(get_api);
      console.log(res);
      this.setState({
        items: res.data.items,
        currentPage: 1,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getUrlByPage(page) {
    return `https://api.github.com/search/issues?q=repo:angular/angular/node+type:issue+state:open+${this.state.searchText}&per_page=10&page=${page}`;
  }

  async changePage(page) {
    try {
      const get_api = this.getUrlByPage(page);
      const res = await axios.get(get_api);
      console.log(res);
      this.setState({
        items: res.data.items,
        currentPage: page,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    await this.changePage(1);
  }

  render() {
    return (
      <div className="table-container">
        <div className="search">
          <input
            type="text"
            placeholder="Search Open Issues..."
            onChange={(evnt) =>
              this.setState({
                searchText: evnt.target.value,
              })
            }
          />
          <button
            onClick={() => {
              this.search();
            }}
          >
            Search
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Issue Number</th>
              <th>Issue Title</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item) => {
              return (
                <tr>
                  <td>{item.number}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/issues/${item.number}`,
                        url: item.url,
                      }}
                    >
                      {item.title}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <footer>
            <button
              disabled={this.state.currentPage <= 1}
              onClick={() => {
                this.changePage(this.state.currentPage - 1);
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                this.changePage(this.state.currentPage);
              }}
            >
              {this.state.currentPage}
            </button>
            <button
              onClick={() => {
                this.changePage(this.state.currentPage + 1);
              }}
            >
              Next
            </button>
          </footer>
      </div>
    );
  }
}
