import React from 'react';
import { render } from 'react-dom';
import StarWars from './components/StarWars';

class App extends React.Component {
  render() {
    return <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="">XEBIA - STARWARS</a>
          </div>
        </div>
      </nav>
      <StarWars />
    </div>;
  }
}

render(<App />, document.getElementById('app'));
