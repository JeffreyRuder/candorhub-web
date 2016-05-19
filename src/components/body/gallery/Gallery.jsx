import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';

import * as actionCreators from '../../../action_creators';
import ImageModal from '../dashboard/ImageModal';
import DashboardNotSignedIn from '../dashboard/DashboardNotSignedIn';
import GalleryList from './GalleryList';
import Sidebar from '../sidebar/Sidebar';


export const Gallery = React.createClass({

  componentDidMount: function() {
    this.props.getMultipleImagesFromServer();
  },

  componentWillUpdate(nextProps) {
    //redirect to splash on sign-out
    if (!nextProps.signedIn) {
      browserHistory.push("/");
    }
  },

  render: function() {
    return <div>
      { this.props.signedIn ?
        <div className="container">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Sidebar />
          </MuiThemeProvider>
        <div className="image-gallery container">
          <GalleryList imagesForGallery={this.props.imagesForGallery} />
        </div>
      </div> :
      <DashboardNotSignedIn />
      }
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    signedIn: state.auth.getIn(["user", "isSignedIn"]),
    imagesForGallery: state.imageGallery.imagesForGallery
  };
}

export const GalleryContainer = connect(
  mapStateToProps,
  actionCreators
)(Gallery);
