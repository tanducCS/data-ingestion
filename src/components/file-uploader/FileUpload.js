// import React, { useState } from "react";

// import { FileUploader } from "react-drag-drop-files";

// const fileTypes = ["PDF"];

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const handleChange = (file) => {
//     setFile(file);
//     console.log(file);
//   };
//   return (
//     <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
//   );
// }

// export default FileUpload;

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './drop-file-input.css';
import { ImageConfig } from './ImageConfig'; 
import uploadImg from '../../assets/cloud-upload-regular-240.png';

const FileUpload = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig.default} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>x
                                        <p>{item.size}B</p>
                                    </div>
                                    <button className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</button>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

FileUpload.propTypes = {
    onFileChange: PropTypes.func
}

export default FileUpload;