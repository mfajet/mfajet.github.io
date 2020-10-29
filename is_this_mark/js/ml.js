tf.enableProdMode();
const MODEL_URL = './js_model/model.json';

if (/Mobi/.test(navigator.userAgent)) {
    tf.setBackend("cpu");
}

const onProgress = (progress) => {
  const progressBar = document.getElementById('progress-bar');
  progressBar.innerHTML = (progress * 100) + "%";
  progressBar.setAttribute("style", "width:" + (progress * 100) + "%;");
}
const get_model = tf.loadLayersModel(MODEL_URL, {onProgress});

let MODEL = null;
get_model.then((model)=> {
  MODEL = model;
  const warmupResult = MODEL.predict(tf.zeros([1,250,250,3]));
  warmupResult.dataSync();
  warmupResult.dispose();

});


const isItMark = async () =>{
  const header = document.getElementById('question');
  const face = document.getElementById('face');
  const faceArr = tf.browser.fromPixels(face).resizeBilinear([250,250]);
  if(!MODEL){
    alert("The model has not finished loading. Check the progress bar");
    return;
  }
  const prediction = MODEL.predict(tf.expandDims(faceArr, 0));
  const value = prediction.dataSync()[0];
  prediction.dispose();
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
