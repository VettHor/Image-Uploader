import React, { useState } from 'react'
import './Administrator.css'
import axios from 'axios';
import Logout from '../Logout/Logout'

const Administrator = () => {
    const [images, setImages] = useState([]);
    
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const newImages = selectedFilesArray.map((file) => {
            return {
                image : URL.createObjectURL(file),
                imageName : file.name,
                imagePost : file
            };
        });
        setImages((previousImages) => previousImages.concat(newImages))
    };

    const sendToDatabase = () => {
        images.map(image => {
            const formData = new FormData();
            formData.append('formFile', image.imagePost);
            formData.append("fileName", image.imageName);
            axios.post("https://localhost:44309/api/Images/add_images", formData);
        })
        alert("Succesfully saved!");
    }

    return(<>
        <Logout/>
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
                <i className="fa fa-upload"/>
                &nbsp; Choose photos from a file
            </label>
            {images.length > 0 &&
                <div>
                    <input 
                        type="button" 
                        id="send-database"
                        onClick={sendToDatabase}
                    />
                    <label htmlFor="send-database" className="mt-2">
                        <i className="fa fa-database"></i>
                        &nbsp; Save photos to a database
                    </label>
                </div>
            }
            <p id="num-of-files">Files Selected : {images.length}</p>
            <div className="images-container">
                {images && images.map((image, index) => {
                    return (
                        <figure key={index}>
                            <button className="btn-close" onClick={() => setImages(images.filter((e) => e !== image))}/>
                            <img src={image.image} alt={image.imageName.split('.')[0]}/>
                            <figcaption>{image.imageName}</figcaption>
                        </figure>
                    );
                })}
            </div> 
        </div>
    </>);
}

export default Administrator;