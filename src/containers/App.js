import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import './App.css';

import { setSearchField, requestRobots } from '../actions';

class App extends React.Component {
  componentDidMount() {
    this.props.onRobotRequest();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props
    const filteredRobots = robots.filter(
      robots => {
        return robots.name.toLowerCase().includes(searchField.toLowerCase())
      }
    )
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        {
          isPending.length ?
          <h1 className='f1 tc'>Loading...</h1> :
          <Scroll>
          <CardList robots={filteredRobots} />
          </Scroll>
        }
      </div>
    );
  }
}
const mapStateToProps = state => { 
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRobotRequest: () => dispatch(requestRobots())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
