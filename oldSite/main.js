var mainDiv = document.getElementById("main-div");
console.log(mainDiv);
var loadMore = document.createElement("button");
loadMore.appendChild(document.createTextNode("MORE FACES!!!!"));
var i = 1;
var addMoreImages = function(){
    var bgNum = Math.floor(Math.random()*61 + 1);
    if (bgNum == 13 || bgNum ==31){
        bgNum++;
    }
    var body =document.body;
    body.style.background= "url(images/face" + bgNum + ".PNG.webp)";

    for(var j=0; j<=5; j++){
        if((i+j)%62!=13 && (i+j)%62!=31 && (i+j)%62!=0){
            var face = document.createElement("img");
            face.src = "images/face" + (i+j)%62 + ".PNG.webp";
            if(face.naturalWidth === 0){
                face.src = "images/face" + (i+j)%62 + "-fs8.png";
                body.style.background= "url(images/face" + bgNum + "-fs8.png)";
            }
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
