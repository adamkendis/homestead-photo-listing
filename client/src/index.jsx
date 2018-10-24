import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
  }


  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "/repos",
      contentType: "application/json",
      data: JSON.stringify({ term }),
      success: data => {
        this.componentDidMount()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  componentDidMount() {
    $.get('/repos', data => {
      this.setState({ repos: data });
    }, 'json');
  }

  //RESOLVED: After entering a GitHub handle in the form, update the page with the latest top 25 without requiring a page refresh.

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));