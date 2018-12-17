import React, { Component } from 'react';

//when working with React Components, remember we use className, we dont pass
//  in class.
class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo" href="/">
            Emaily
          </a>
          <ul className="right">
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
