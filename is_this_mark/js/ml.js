tf.setBackend('cpu');
const MODEL_URL = './js_model/model.json';


const onProgress = (progress) => {
  console.log(progress);
  const progressBar = document.getElementById('progress-bar');
  progressBar.innerHTML = (progress * 100) + "%";
  progressBar.className = "progress-bar w-" + (progress * 100)
}
const get_model = tf.loadLayersModel(MODEL_URL, {onProgress});

MODEL = null;
get_model.then((model)=> {
  MODEL= model;
});


const isItMark = async () =>{
  const header = document.getElementById('question');
  const face = document.getElementById('face');
  faceArr = tf.browser.fromPixels(face).resizeBilinear([250,250]);
  if(!MODEL){
    alert("The model has not finished loading. Check the progress bar");
    return;
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
