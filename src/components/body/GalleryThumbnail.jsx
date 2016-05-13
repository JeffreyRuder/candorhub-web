import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import GalleryList from './GalleryList';
import GalleryView from './GalleryView';

export default React.createClass({

  getImageUrl() {
    return this.props.image.image || [];
  },

  getImageTitle() {
    this.props.image.title || [];
  },

  getImageDescription() {
    return this.props.image.description || [];
  },

  getImageId() {
    return this.props.image.id || [];
  },

  render: function(){
    return <div key={this.getImageId()} className="gallery-thumbnail col-md-6">
        <img className="gallery-img" src={this.getImageUrl()} alt={this.getImageDescription()}></img>
        <p className="image-gallery-title">{this.props.image.title}</p>
      </div>;
    }
  })
