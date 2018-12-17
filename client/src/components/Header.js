import React, { Component } from 'react';
import { connect } from 'react-redux';

//when working with React Components, remember we use className, we dont pass
//  in class.
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google"></a></li>;
      default:
        return <li><a>Logout</a></li>;
    }
  }
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo" href="/">
            Emaily
          </a>
          <ul className="right">
            <li>
              <a href="/auth/google">{this.renderContent()}</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
