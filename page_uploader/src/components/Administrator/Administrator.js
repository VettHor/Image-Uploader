import React, { useState } from 'react'
import './Administrator.css'

const Administrator = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesNames, setImagesNames] = useState([])
    
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        const imagesNames = selectedFilesArray.map((file) => {
            return file.name;
        });
        setImagesNames((previousNames) => previousNames.concat(imagesNames));
        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    };

    return(
        <div className="container">
            <input 
                type="file" 
                id="file-input" 
                accept="image/png, image/jpeg, image/webp" 
                onChange={onSelectFile} 
                onClick={(event) => { event.target.value = '' }}
                multiple
            />
            <label htmlFor="file-input">
                <i className="fas fa-upload"/>
                &nbsp; Choose a photo
            </label>
            <p id="num-of-files">Files Selected : {selectedImages.length}</p>
            <div className="images-container">
                {selectedImages && selectedImages.map((image, index) => {
                    return (
                        <figure key={index}>
                            <button className="delete-button btn-close" onClick={() => setSelectedImages(selectedImages.filter((e) => e !== image))}/>
                            <img src={image} alt={imagesNames[index].split('.')[0]}/>
                            <figcaption>{imagesNames[index]}</figcaption>
                        </figure>
                    );
                })}
            </div> 
        </div>
    );
}

export default Administrator;