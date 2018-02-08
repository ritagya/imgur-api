/* We want to do the following

We'll be messing around with the imgur API - https://apidocs.imgur.com/

 1. Get info about an image that has the hash (aka ID) n1xml
 2. Modify your code to utilize getClientId
 3. Upload an image to imgur using the public API. The image to use is http://i68.tinypic.com/23upv91.gif.
 4. Add the image to the page, with double the height and width
 
 clientId is e6bf8d8ea1e33cd
 
  */

var clientIdPromise = getClientId();
clientIdPromise.then(function(clientIdObj){
    var clientId = "Client-ID " + clientIdObj.clientId;
    console.log(clientId);
    getImage(clientId);
    uploadImage(clientId);
})
function getImage(id){
    $.ajax({
        url: "https://api.imgur.com/3/image/n1xml",
        headers: {"Authorization": id},
        type: "GET"
    }).then(function(data){
        console.log(data.data.link);
    });
}
function uploadImage(id){
    $.ajax({
        url: "https://api.imgur.com/3/image",
        headers: {"Authorization": id},
        type: "POST",
        data : {
            "image": "http://i68.tinypic.com/23upv91.gif"
        }
    }).then(function(data){
        var imgSrc = data.data.link;
        console.log('successfully uploaded image with ' , imgSrc);
        var imgTag = document.createElement('img');
        document.body.appendChild(imgTag);
        imgTag.setAttribute('src', imgSrc);
    });
}