import React, { useState } from "react";
import axios from 'axios';

const CreateTests = () => {
    const [file, setFile] = useState();
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    
    const upload = async () => {
        const formData = new FormData();
        if (file != null) {
            formData.append('file', file);
            await axios.post('http://localhost:3001/upload', formData);
            // Assuming the user's question is stored in a state variable named 'question'
            const response = await axios.get(`http://localhost:3001/ask?question=${question}`);
            setResponse(response.data.result);
        } else {
            alert("File not uploaded");
        }
    };
    
    const askQuestion = () => {
        axios.get(`http://localhost:3010/ask?question=${question}`)
            .then(response => {
                setResponse(response.data.result);
            })
            .catch(error => {
                console.error("Error asking question:", error);
            });
    };
    
    return (
        <>
            <h1>Enter Your Pdf file here.</h1>
            <div>
                <label htmlFor="images" className="drop-container" id="dropcontainer">
                    <span className="drop-title">Drop files here</span>
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
                <div className="card">
                    <br></br>
                    <h1>Create Your Test</h1>
                    <br></br>
                    <center>
                        <label className="input">
                            <input className="input__field" type="text" placeholder="Enter Your Topic Here" onChange={(e) => setQuestion(e.target.value)} />
                        </label>
                        <button onClick={askQuestion}>Ask</button>
                    </center>
                    <p>{response}</p>
                </div>
            </center>
        </>
    );
};

export default CreateTests;
