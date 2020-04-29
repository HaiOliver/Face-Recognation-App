import React from 'react';
import './facerecognation.css';

const FaceRecognition = ({imageUrl,box}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
            <img id="inputimage" alt="something wrong" src={imageUrl} width="400px" height= 'auto'/>
            <div className="bounding-box" style={{top: box.leftCol, right: box.topRow, bottom: box.rightCol, left: box.bottomRow }}>
                
            </div>
            </div>
          
        </div>
    );
}

export default FaceRecognition;