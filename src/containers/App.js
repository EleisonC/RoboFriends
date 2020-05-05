import React from 'react';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      robots: [],
      searchField: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(
      response => response.json()
      ).then(users => {
        this.setState({ robots: users})
      })
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }
  render() {
    const { searchField, robots } = this.state
    const filteredRobots = robots.filter(
      robots => {
        return robots.name.toLowerCase().includes(searchField.toLowerCase())
      }
    )
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        {
          !robots.length ? 
          <h1 className='f1 tc'>Loading...</h1> :
          <Scroll>
          <CardList robots={filteredRobots} />
          </Scroll>
        }
      </div>
    );
  }
}

export default App;