import Infinite from 'react-infinite';
import React from 'react';
import { Router, Route, Link } from 'react-router';
import SearchInput, {createFilter} from 'react-search-input';
import Masonry from 'react-masonry-component';


// gallery for viewing works by a specific user

const keysToFilters = ['user.username', 'tags.body', 'title']

const masonryOptions = {
    transitionDuration: 500,
    gutter: 15,
    fitWidth: true,
  };

  export default React.createClass({

    getInitialState() {
      return {
        searchTerm: '',
        elements: this.buildElements(0, 15),
        isInfiniteLoading: false
      }
    },

    searchUpdated(term) {
      this.setState({searchTerm: term})
    },

    //infinite scroll functions
    buildElements: function(start, end) {
        var elements = [];
        for (var i = start; i < end; i++) {
            elements.push(<div className="gallery__link" />)
        }
        return elements;
    },

    handleInfiniteLoad: function() {
        var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        setTimeout(function() {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + 1000);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 500);
    },

    elementInfiniteLoad: function() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    },

    render: function() {
      const filteredImages = this.props.imagesBySpecificUser.filter(createFilter(this.state.searchTerm, keysToFilters))
      var filteredImageGallery = filteredImages.map(function(image){
        return (
          <figure key={image.id} >
              <div className="gallery__link">
                <Link to={`/gallery/${image.id}`} params={{id: image.id}}>
                  <img className="gallery__item" src={image.image_small}></img>
                  <figcaption>
                    <h3 className="gallery__title-hover">{image.title}</h3>
                    {image.user ? <span className="gallery__caption-hover">by {image.user.username}</span> : null}
                    <span className="gallery__comments-hover">{image.comment_count} Critiques</span>
                  </figcaption>
                </Link>
              </div>
            </figure>
          );
        });
        return (
          <div className="gallery__images">
            <div className="gallery__header-search">
              <SearchInput className="search-input" placeholder="Search Works by this Artist" onChange={this.searchUpdated} />
              <h2 className="gallery__header">Browse Artwork</h2>
            </div>
            <Infinite elementHeight={2000}
                               infiniteLoadBeginEdgeOffset={10000}
                               onInfiniteLoad={this.handleInfiniteLoad}
                               loadingSpinnerDelegate={this.elementInfiniteLoad()}
                               isInfiniteLoading={this.state.isInfiniteLoading}
                               timeScrollStateLastsForAfterUserScrolls={1000}
                               useWindowAsScrollContainer
                               >
              <Masonry
                      options={masonryOptions}
                      disableImagesLoaded={false}
                      className={"gallery__images"}
                >
              {filteredImageGallery}
            </Masonry>
          </Infinite>
        </div>
        );
      }
    });
