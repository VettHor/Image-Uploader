import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import './User.css'
import Logout from '../Logout/Logout'

const Administrator = () => {
    const [toogle, setToogleState] = useState(true);
    const key = '26824337-90aac58d6ed1325b2e112fde0';
    const [imagesTakenApi, setImagesTakenApi] = useState([]);
    const [imagesTaken, setImagesTaken] = useState([]);

    const searchImagesApi = (word) => {
        fetch(`https://pixabay.com/api/?key=${key}&q=${word}&image_type=photo`)
        .then(res => res.json())
        .then(json => {setImagesTakenApi(json.hits); console.log(json.hits);});
    }

    const getFromDataBase = () => {
        fetch("https://localhost:44309/api/Images/get_images")
        .then(res => res.json())
        .then(json => {
            const imgs = json.map(image => {
                return {
                    imageName : image.ImageName,
                    byteImage : image.Image,
                    image : `data:image/${image.ImageName.split('.')[1]};base64,${image.Image}`
                }
            });
            document.getElementById("search-input").value = "";
            setImagesTaken(imgs);
            setToogleState(false);
        });
    }

    const searchImagesRequest = (word) => {
        if(word !== "") {
            fetch(`https://localhost:44309/api/Images/get_image_by_word/${word}`)
            .then(res => res.json())
            .then(json => {
                const imgs = json.map(image => {
                    return {
                        imageName : image.ImageName,
                        byteImage : image.Image,
                        image : `data:image/${image.ImageName.split('.')[1]};base64,${image.Image}`
                    }
                });
                setImagesTaken(imgs);
            });
        }
    }

    const downloadImage = (imageURL, imageName) => {
        saveAs(imageURL, imageName);
    }

    const searchInputButton = (word) => {
        toogle ? searchImagesApi(word) : searchImagesRequest(word);
    }

    const searchKeyDown = (event) => {
        if (event.key === 'Enter') {
            toogle ?  searchImagesApi(event.target.value) : searchImagesRequest(event.target.value);
        }
    }

    const Swap = () => {
        setToogleState(toogle ? false : true); 
        searchInputButton(document.getElementById("search-input").value);
    }

    return(<>
        <Logout/>
        <div className="container">
            <input 
                type="button" 
                id="data-output" 
                onClick={getFromDataBase}
            />
            <label htmlFor="data-output">
                <i className="fa fa-upload"/>
                &nbsp; Open all photos from database 
            </label>
            <div className="card-body p-2 mt-3">
                <div className="d-flex flex-row justify-content-center">
                    <input className="search-input" type="search" id="search-input" placeholder={toogle ? "Search images in pixabay" : "Search images in database"} onKeyDown={searchKeyDown}></input>
                    <button className="search-btn" onClick={() => searchInputButton(document.getElementById("search-input").value)}>
                        <i className="fas fa-search" aria-hidden="true"/>
                    </button>
                    <button className="swap-btn" onClick={() => Swap()}>
                        <i className="fas fa-sync-alt" aria-hidden="false"/>
                    </button>
                </div>
            </div>
            <p id="num-of-files">Found files : {toogle ? imagesTakenApi.length : imagesTaken.length}</p>
            <div className="images-container">
                {toogle 
                    ? imagesTakenApi && imagesTakenApi.map((image, index) => {
                        let name = image.pageURL.split('/')[image.pageURL.split('/').length - 2].split('-');
                        name.pop();
                        let imageName = `${name.join('-')}.${image.largeImageURL.split('.').pop()}`;
                        return (
                            <figure key={index} className="user-btn">
                                <button 
                                    type="submit" 
                                    className="btn-close" 
                                    onClick={() => downloadImage(image.largeImageURL, imageName)}
                                />
                                <img 
                                    src={image.largeImageURL} 
                                    alt={imageName} 
                                    style={{pointerEvents: 'none'}}
                                />
                                <figcaption>
                                    {imageName}
                                </figcaption>
                            </figure>
                        );
                    }) 
                
                    : imagesTaken && imagesTaken.map((image, index) => {
                        return (
                            <figure key={index} className="user-btn">
                                <button 
                                    type="submit" 
                                    className="btn-close" 
                                    onClick={() => downloadImage(image.image, image.imageName)}
                                />
                                <img src={image.image} alt={image.imageName}/>
                                <figcaption>
                                    {image.imageName}
                                </figcaption>
                            </figure>
                        );
                    })
                }
            </div> 
        </div>
    </>);
}

export default Administrator;