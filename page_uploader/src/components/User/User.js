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

    const searchImages = (event) => {
        if(event.key === 'Enter') {
            fetch(`https://localhost:44309/api/Images/get_image_by_word/${event.target.value}`)
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
            <div className="card-body p-2 mt-3">
                <div className="d-flex flex-row justify-content-center">
                    <input className="search-input" placeholder="Search images" onKeyDown={searchImages}></input>
                </div>
            </div>
            <p id="num-of-files">Found files : {selectedImages.length}</p>
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