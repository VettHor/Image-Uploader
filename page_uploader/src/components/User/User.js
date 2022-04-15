import React, { useState } from 'react'
import axios from 'axios';
import './User.css'

const Administrator = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesNames, setImagesNames] = useState([]);

    const getFromDataBase = () => {
        fetch("https://localhost:44309/api/Images/get_images")
        .then(res => res.json())
        .then(json => {
            let oImagesNames = [];
            let oImages = [];
            for(var i = 0; i < json.length; ++i) {
                oImagesNames.push(json[i].ImageName);
                oImages.push(`data:image/${oImagesNames[i].split('.')[1]};base64,${json[i].Image}`);
            }
            setSelectedImages(oImages);
            setImagesNames(oImagesNames);
        });
    }

    return(
        <div className="container">
            <input 
                type="button" 
                id="data-output" 
                onClick={getFromDataBase}
            />
            <label htmlFor="data-output">
                <i className="fa fa-upload"/>
                &nbsp; Open All photos
            </label>
            <p id="num-of-files">Files Selected : {selectedImages.length}</p>
            <div className="images-container">
                {selectedImages && selectedImages.map((image, index) => {
                    return (
                        <figure key={index}>
                            <img src={image} alt={imagesNames[index]}/>
                            <figcaption>{imagesNames[index]}</figcaption>
                        </figure>
                    );
                })}
            </div> 
        </div>
    );
}

export default Administrator;