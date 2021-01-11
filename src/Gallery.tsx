import React, { useState, useEffect }  from "react";
import { Image } from './types/Image'
import global from './global'
import { request } from './request/request'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface Props {
  token: string
}

const buildURL = (id:string) => {
  return global._BASE_URL + `/images/${id}`
}

export const Gallery = (props: Props) => {

  const [activePageIndex, setActivePageIndex] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    pullPageImages(activePageIndex);
  }, [])

  const incrementPage = () => {
    setActivePageIndex(activePageIndex + 1) ;
    pullPageImages(activePageIndex);
  }
  
  const decrementPage = () => {
    if ( activePageIndex - 1 > 0 )
    {
      setActivePageIndex(activePageIndex - 1) ;
      pullPageImages(activePageIndex);
    }
  }

  const pullPageImages = async ( page: number) => {
    try {
      const response = await request.request(global._BASE_URL + 'images', 'get', props.token, { "page": page });
      if (response) {
        let images : Image[] = [];
        response.pictures.forEach( (pic) => {
          let image : Image = { id: pic.id, croppedPicture: pic.cropped_picture }
          images.push(image);
        });
        setImages(images);
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  const getImageContent = () => {
    let content = []
    images.map(image => (
      content.push(<div key={image.id}>
          <img src={image.croppedPicture} />
      </div>)
    ));
    return content ;
  }

  return props.token ?
    <div>
      <Carousel showArrows={true}>   
        { getImageContent() }
      </Carousel>
        { activePageIndex > 1 && <input type="button" value="prev" onClick={ () => { decrementPage() }}/> }
        { images.length > 0 && <input type="button" value="next" onClick={ () => { incrementPage() }} /> }
    </div>
    
  : <div>Token was not provided</div>
}
