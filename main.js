var mainDiv = document.getElementById("main-div");
console.log(mainDiv);
var loadMore = document.createElement("button");
loadMore.appendChild(document.createTextNode("Can't get enough of my face?"));
var i = 1;
var addMoreImages = function(){
    for(var j=0; j<=5; j++){
        if((i+j)%62!=13 && (i+j)%62!=31 && (i+j)%62!=0){
            var face = document.createElement("img");
            face.src = "/images/face" + (i+j)%62 + ".PNG";
            face.setAttribute("width", "90%");
            mainDiv.appendChild(face);
        }else{
            i++;
            j--;
        }
    }
    i+=6;
    mainDiv.appendChild(loadMore);
}
addMoreImages();
loadMore.onclick = addMoreImages;
