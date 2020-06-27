import React, { Component } from 'react';

import Users from './components/users/Users';
import Toogle from './components/toggle/Toggle';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false,
    };
  }
  async componentDidMount() {
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&results=10&nat=BR&noinfo'
    );

    const json = await res.json();

    this.setState({
      users: json.results,
    });

    console.log('componentDidMount de App.js');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate de App.js');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount de App.js');
  }

  handleShowUsers = (isChecked) => {
    this.setState({ showUsers: isChecked });
  };
  render() {
    const { showUsers, users } = this.state;
    return (
      <div>
        <h3>React LifeCycle</h3>
        <Toogle enabled={showUsers} onToggle={this.handleShowUsers} />
        <hr />
        {showUsers && <Users users={users} />}
        <div></div>;
      </div>
    );
  }
}
