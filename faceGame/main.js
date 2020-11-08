var image;
let used =[];

function start(){
    var faceNum = Math.floor(Math.random()*61 + 1);
        if (faceNum == 13 || faceNum ==31){
            faceNum++;
        }
    image = new Image();
    imagePieces =[];
    image.src = './markFaces/face' + faceNum + '.PNG';
    image.onload = cutImageUp;
    emptyBox = 1;

}
var white = new Image();
var solved = false;
start();
document.onkeydown = checkKey;
var emptyBox = 1;
function checkKey(e) {
    console.log(emptyBox);
    moveTo= emptyBox
    e = e || window.event;
    if (e.keyCode == '38') {//up
        if(emptyBox<7 && emptyBox){
            emptyBox = moveTo + 3;
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if(emptyBox>3){
            emptyBox = moveTo - 3;
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
       if(emptyBox %3 !=0){
           emptyBox = moveTo + 1;
       }
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(emptyBox %3 != 1){
           emptyBox = moveTo -1;
       }
    }
    if(moveTo != emptyBox){
        var from = document.getElementById(emptyBox);
        var to = document.getElementById(moveTo);
        var fromSrc = from.src;
        from.src=whiteURL;
        to.src=fromSrc;
        from.style.width = "100px";
        isSolved();
    }
}
var heightOfOnePiece;
var widthOfOnePiece;
numColsToCut = 3;
numRowsToCut = 3;
var whiteURL;
var imagePieces = [];

function cutImageUp() {
    widthOfOnePiece =this.width / 3;
    heightOfOnePiece=this.height / 3;
    var emptyPic = document.getElementById('1');
    emptyPic.style.width = "100px";
    emptyPic.style.height = "auto";
        for(var y = 0; y < numRowsToCut; y++) {
            for(var x = 0; x < numColsToCut; x++) {

            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }

    // imagePieces now contains data urls of all the pieces of the image
    let solvable = false;
    while(!solvable){
      used = [];
      // load one piece onto the page
      for (var i = 0; i < 9; i++) {
          var r = Math.floor(Math.random() * 9);
          while(used.indexOf(r)!=-1){
              r= Math.floor(Math.random() * 9);
          }
          used.push(r)
      }
      solvable = isSolvable(used);
      console.log(used);
    }
    var first = document.getElementById('1');
    first.src="";
    for (var i = 2; i < 10; i++){
        var anImageElement = document.getElementById(i);
        anImageElement.src = imagePieces[used[i-1]];
        anImageElement.style.width = "100px"
        anImageElement.style.height= "auto";
    }
    white.onload = cropWhite;
    white.src ="./white.PNG";
}

function cropWhite() {

            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(white, widthOfOnePiece, heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            whiteURL = (canvas.toDataURL());
            console.log(whiteURL);
            var emptyPic = document.getElementById('1');
            emptyPic.src=whiteURL;
            emptyPic.style.width = "100px";
            emptyPic.style.height = "auto";


}

function isSolvable(arr){
  let inversions = 0;
  for (i=0;i<arr.length-1; i++){
    for(j=i+1;j<arr.length; j++){
      if(arr[i] && arr[j] && arr[i] > arr[j]){
        inversions +=1;
      }
    }
  }
  console.log(inversions);
  return (inversions % 2 == 0) && inversions !=0;
}

function solve(){
    for (var i = 1; i < 10; i++){
        var anImageElement = document.getElementById(i);
        anImageElement.src = imagePieces[i-1];
        anImageElement.style.width = "100px"
        anImageElement.style.height= "auto";
    }
}

var butt = document.getElementById('butt');
butt.onclick = solveOrReplay;
function solveOrReplay(){
    console.log("DSFsdf");
    if (solved){
        solved = false;
        start();
        butt.firstChild.data = "Solve it!"
    }else{
        solved = true;
        solve();
        butt.firstChild.data = "ANOTHER FACE!"
    }
}

function isSolved(){
    solved = true;
    for (var i = 1; i <=9; i++) {
        var img = document.getElementById(i);
        if(used[0] != (i-1) && img.src != imagePieces[i-1]){
            solved = false
        }
    }
    if(solved){
        solve();
        butt.firstChild.data = "ANOTHER FACE!"
        alert("Congratulations! Click OK to see my beautiful face!");
    }
}
