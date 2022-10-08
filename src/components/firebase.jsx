import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {

    apiKey: process.env.REACT_APP_APIKEY,
  
    authDomain: process.env.REACT_APP_DOMAIN,
  
    projectId: process.env.REACT_APP_PROJECTID,
  
    storageBucket: process.env.REACT_APP_BUCKET,
  
    messagingSenderId: process.env.REACT_APP_SENDER,
  
    appId: process.env.REACT_APP_APIID
  
  };
  
  
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app)