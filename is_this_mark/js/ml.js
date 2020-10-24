// import * as tf from '@tensorflow/tfjs';
// import {loadGraphModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = './js_model/model.json';

const get_model = tf.loadLayersModel(MODEL_URL);
MODEL = null;
get_model.then((model)=> {
  MODEL= model;
});


const isItMark = async () =>{
  const header = document.getElementById('question');
  const face = document.getElementById('face');
  faceArr = tf.browser.fromPixels(face).resizeBilinear([250,250]);
  if(!MODEL){
    MODEL = await get_model;
  }
  prediction = MODEL.predict(tf.expandDims(faceArr, 0));
  value = prediction.dataSync()[0];
  const isMark = (value < 0.5);
  if (isMark){
    header.innerHTML += ' Yes!';
  }else{
    header.innerHTML += ' No!';
  }
}

const newPhoto = () => {
    const header = document.getElementById('question');
    const face = document.getElementById('face');
    header.innerHTML = 'Is this Mark?'
    const currentSrcNum = parseInt(face.src.substr(-5))
    face.src = "images/face" + ((currentSrcNum % 12) +1)  +".JPG";
}
