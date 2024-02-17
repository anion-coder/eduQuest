import React, { useState } from "react";
import axios from 'axios';

const CreateTests = () => {
    const[file, setFile] = useState()
    const upload = () => {
        const formData = new FormData()
        if(file!=null){
            formData.append('file', file)
            axios.post('http://localhost:3001/upload',formData)
            .then(alert("File Uploaded"))
            .catch(er => console.log("HEllo:"+er))
        }
        else{
            alert("File not uploaded");
        }
        
    }
    
    
    return (
        <>
        <h1>Enter Your Pdf file here.</h1>
        <div>
            <label for="images" class="drop-container" id="dropcontainer">
            <span class="drop-title">Drop files here</span>
            or
            <input type="file" id="images" required onChange={(e) => setFile(e.target.files[0])}/>
            </label>
            <br></br>
            <center>
            <div id="container">
            <a className="bruh" onClick={upload}>Upload</a>
            </div>
            </center>
        </div>

        <center>
        <div class="card">
            <br></br>
            <h1>Create Your Test</h1>
            <br></br>
            <center>
            <label class="input">
                <input class="input__field" type="text" placeholder="Enter Your Topic Here" />
            </label>
            </center>
        </div>
        </center>

        {/* <div class="chat-container">
            <h2>Create Your Test</h2>
            <input type="text" className="field" placeholder="Enter Your Topic"/>
        </div> */}
        </>
        
    );
};

export default CreateTests;
