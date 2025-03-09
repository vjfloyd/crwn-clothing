// CustomImageComponent.js
import React from 'react';

const ImageComponent = ({ imageurl, alt }) => {
  return <img src={imageurl} alt={alt} />;
};

export default ImageComponent;