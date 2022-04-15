import React, { useState } from 'react'
import './Administrator.css'
import axios from 'axios';

const Administrator = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesNames, setImagesNames] = useState([])
    const [imagePost, setImagePost] = useState([]);
    
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
        setImagePost(event.target.files);
    };

    const sendToDatabase = async () => {
        // const formData = new FormData();
        // formData.append('file', imagePost[0]);
        // console.log(formData);
        // fetch("https://localhost:44309/api/Images/add_images", {
        //     method: "POST",
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //   console.log(data)
        // })
        // .catch(error => {
        //   console.error(error)
        // })
        for(var i = 0; i < imagePost.length; ++i) {
            const formData = new FormData();
            formData.append('formFile', imagePost[i]);
            formData.append("fileName", imagesNames[i]);
            const res = await axios.post("https://localhost:44309/api/Images/add_images", formData);
        }
        alert("Succesfully saved!");
    }

    //     fetch("https://localhost:44309/api/Images/add_images", {                      
    //         method: "POST",  
    //         headers: {'Content-Type': 'application/json'},
    //         body: new FormData().append('Images', imagePost[0])
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         console.log(imagePost[0]);
    //     });      
    // }

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
                <i className="fa fa-upload"/>
                &nbsp; Choose a photo
            </label>
            {selectedImages.length > 0 &&
                <div>
                    <input 
                        type="button" 
                        id="send-database"
                        onClick={sendToDatabase}
                    />
                    <label htmlFor="send-database" className="mt-2">
                        <i className="fa fa-database"></i>
                        &nbsp; Save photos
                    </label>
                </div>
            }
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