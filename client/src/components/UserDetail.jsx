import React, { Component } from 'react';
import Lightbox from 'react-images';

export default class UserDetail extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Lightbox
            images={[
              { src: 'http://example.com/img1.jpg' },
              { src: 'http://example.com/img2.jpg' }
            ]}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClose={this.closeLightbox}
          />
        </div>

        <div>
          <h2> </h2>
        </div>
      </div>
    );
  }
}
