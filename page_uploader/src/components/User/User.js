// import React, { useState } from 'react'
// import './User.css'

// const Administrator = () => {
//     const [selectedImages, setSelectedImages] = useState([]);
//     const [imagesNames, setImagesNames] = useState([]);
//     const [bytesImages, setBytesImages] = useState([]);

//     const getFromDataBase = () => {
//         fetch("https://localhost:44309/api/Images/get_images")
//         .then(res => res.json())
//         .then(json => {
//             let oImagesNames = [];
//             let oImages = [];
//             let oImagesBytes = [];
//             for(var i = 0; i < json.length; ++i) {
//                 oImagesNames.push(json[i].ImageName);
//                 oImages.push(`data:image/${oImagesNames[i].split('.')[1]};base64,${json[i].Image}`);
//                 oImagesBytes.push(json[i].Image);
//             }
//             setSelectedImages(oImages);
//             setImagesNames(oImagesNames);
//             setBytesImages(oImagesBytes);
//         });
//     }

//     const searchImages = (event) => {
//         if(event.key === 'Enter') {
//             searchImagesRequest(event.target.value);
//         }
//     }

//     const searchImagesRequest = (word) => {
//         if(word !== "") {
//             fetch(`https://localhost:44309/api/Images/get_image_by_word/${word}`)
//             .then(res => res.json())
//             .then(json => {
//                 let oImagesNames = [];
//                 let oImages = [];
//                 for(var i = 0; i < json.length; ++i) {
//                     oImagesNames.push(json[i].ImageName);
//                     oImages.push(`data:image/${oImagesNames[i].split('.')[1]};base64,${json[i].Image}`);
//                 }
//                 setSelectedImages(oImages);
//                 setImagesNames(oImagesNames);
//             });
//         }
//     }

//     const downloadImage = (name, image) => {
//         const link = document.createElement('a');
//         link.href = window.URL.createObjectURL(
//             new Blob(
//                 [new Blob([base64ToArrayBuffer(image)], {type: `application/${name.split('.')[1]}`})]
//             )
//         );
//         link.setAttribute('download', name);
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);
//     }

//     const base64ToArrayBuffer = (base64) => {
//         var binaryString = window.atob(base64);
//         var binaryLen = binaryString.length;
//         var bytes = new Uint8Array(binaryLen);
//         for (var i = 0; i < binaryLen; i++) {
//            var ascii = binaryString.charCodeAt(i);
//            bytes[i] = ascii;
//         }
//         return bytes;
//     }

//     return(
//         <div className="container">
//             <input 
//                 type="button" 
//                 id="data-output" 
//                 onClick={getFromDataBase}
//             />
//             <label htmlFor="data-output">
//                 <i className="fa fa-upload"/>
//                 &nbsp; Open All photos
//             </label>
//             <div className="card-body p-2 mt-3">
//                 <div className="d-flex flex-row justify-content-center">
//                     <input className="search-input" type="search" id="search-input" placeholder="Search images" onKeyDown={searchImages}></input>
//                     <button className="search-btn" onClick={() => searchImagesRequest(document.getElementById("search-input").value)}>
//                         <i className="fas fa-search" aria-hidden="true"/>
//                     </button>
//                 </div>
//             </div>
//             <p id="num-of-files">Found files : {selectedImages.length}</p>
//             <div className="images-container">
//                 {selectedImages && selectedImages.map((image, index) => {
//                     return (
//                         <figure key={index} className="user-btn">
//                             <button 
//                                 type="submit" 
//                                 className="btn-close" 
//                                 onClick={() => downloadImage(imagesNames[index], bytesImages[index])}
//                             />
//                             <img src={image} alt={imagesNames[index]}/>
//                             <figcaption>
//                                 {imagesNames[index]}
//                             </figcaption>
//                         </figure>
//                     );
//                 })}
//             </div> 
//         </div>
//     );
// }

// export default Administrator;

import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import './User.css'

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
                    <input className="search-input" type="search" id="search-input" placeholder="Search images" onKeyDown={searchKeyDown}></input>
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
    );
}

export default Administrator;