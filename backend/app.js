import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as dotenv from 'dotenv';
import * as use from '@tensorflow-models/universal-sentence-encoder'; // Import Universal Sentence Encoder
const path=require("./index.js");
dotenv.config();

const injest_docs = async () => {
    const loader = new PDFLoader("path.v"); // Replace with your PDF file
    const model = await use.load(); // Load the Universal Sentence Encoder model

    const docs = await loader.load();
    console.log('Docs loaded');
    
    // Generate embedded text representations
    const embeddedText = await getEmbeddedText(model, docs);

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
  
    const docOutput = await textSplitter.splitDocuments(docs);
  
    let vectorStore = await FaissStore.fromDocuments(
      docOutput,
      embeddedText
    );
    console.log('Saving...');
  
    const directory = "C:\\eduQuest"; // Fix the directory path
    await vectorStore.save(directory);
    console.log('Saved!');
}

async function getEmbeddedText(model, documents) {
    const embeddedText = [];

    for (const document of documents) {
        const embeddings = await model.embed([document]);
        const embeddedVector = embeddings.arraySync()[0];
        embeddedText.push(embeddedVector);
    }

    return embeddedText;
}

injest_docs();
