import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as actionCreators from '../../../action_creators';
import {SignInContainer} from './SignIn';
import SignUp from './SignUp';

const critiqueCopy = "Share your insights and opinions about works of art, guided by thought-provoking questions. Good candorhub karma means sharing a critique before expecting others to critique your work.";

const critiqueImage = require("./gear.png")

const learnCopy = "Upload your own images and get meaningful, constructive feedback from fellow artists, who will always be able to see your work at full size and full resolution.";

const learnImage = require('./antikythera.png');

const growCopy = "Share works in progress, sketches, and drafts and get feedback that will enhance the finished project.";

const growImage = require('./astrolabe.png');

export const Splash = React.createClass({

  getInitialState:function() {
    return { signUpShow: true };
    return { signInShow: false };
  },

  onHandleClick: function() {
    this.setState({ signUpShow: !this.state.signUpShow });
    this.setState({ signInShow: !this.state.signInShow });
  },

  componentWillUpdate(nextProps) {
    //redirect to dashboard on successful sign-in
    if (nextProps.signedIn) {
      browserHistory.push("/dashboard");
    }
  },

  render: function() {
    return (
      <div className="splash">
        <div className="splash__login-container">
          <h1 className="splash__logo">candorhub</h1>
          <p className="splash__tagline">Thought Provoking Critique</p>
            { this.state.signUpShow ? <SignUp /> : null }
            { this.state.signUpShow ? <h3 className="form__member-header" onClick={ this.onHandleClick }>Already a member?</h3> : null }
          <ReactCSSTransitionGroup
            transitionName="formTransition"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            { this.state.signInShow ? <SignInContainer /> : null }
          </ReactCSSTransitionGroup>
        </div>
        <div className="splash__tour-container">
          <h4 className="splash__tour-header">how candorhub works</h4>
          <div className="splash__column-container container">
            <div className="splash__tour-column col-md-4">
              <h5>critique</h5>
              <img className="splash__tour-image" src={growImage} alt="Astrolabe Diagram" />
              <div className="splash__column-content">
                <p className="splash__tour-copy">{critiqueCopy}</p>
              </div>
            </div>
            <div className="splash__tour-column col-md-4">
              <h5>learn</h5>
              <img className="splash__tour-image" src={growImage} alt="Astrolabe Diagram" />
              <div className="splash__column-content">
                <p className="splash__tour-copy">{learnCopy}</p>
              </div>
            </div>
            <div className="splash__tour-column col-md-4">
              <h5>grow</h5>
              <img className="splash__tour-image" src={growImage} alt="Astrolabe Diagram" />
              <div className="splash__column-content">
                <p className="splash__tour-copy">{growCopy}</p>
              </div>
            </div>
          </div>
          <h4 className="splash__about-header">about</h4>
          <div className="splash__about-us">
            <p>Candorhub is a creation of Lauryn Davis, Jeffrey Ruder, Riley Starnes, and Patrick Sullivan, interns at DevelopmentNow. </p>
            <p><a href="https://developmentnow.com/" target="_blank">DevelopmentNow</a> is an award-winning digital product solutions agency located in the Pacific Northwest.</p>
          </div>
        </div>
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    signedIn: state.auth.getIn(["user", "isSignedIn"])
  };
}

export const SplashContainer = connect(
  mapStateToProps,
  actionCreators
)(Splash);
