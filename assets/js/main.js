//Vision Api Logic
var api_key = 'AIzaSyBY93fja8yxM9not6Nrd2v6NsRgNpJ4ZvM';

//Handles the User image upload.
function uploadFiles(event) {
  console.log('uploaded file')
  event.stopPropagation(); // Stop stuff happening
  event.preventDefault(); // Totally stop stuff happening

  //Grab the file and asynchronously convert to base64.
  var file = $('#fileInput')[0].files[0];
  var reader = new FileReader()
  reader.onloadend = processFile
  reader.readAsDataURL(file);
  console.log(reader);
}

//Encodes the new base 64img
function processFile(event) {
  var encodedFile = event.target.result;
  //
  sendFiletoCloudVision(encodedFile);
}

//Gets all the information from the returned json object
function displayJSON(object){
  var labelArr = object.responses[0].labelAnnotations;
  var string = "";
  for (var i=0; i < labelArr.length; i++){
    console.log(labelArr[i].description + " | " + parseInt(labelArr[i].score*100) + "% match");
    $('#results').append('<p>'+labelArr[i].description + " | " + parseInt(labelArr[i].score*100) + "% match" + '</p>');
    string += labelArr[i].description + ", "
  }
  $('#results').append('<p>'+string+'</p>')
}

//Sends the file to CloudVision
function sendFiletoCloudVision(file){
  var type = 'LABEL_DETECTION';
  //This will currently only allow jpeg images
  var fileType = file.split(',');
  fileType = fileType[0] + ",";
  console.log(fileType)
  var content = file.replace(fileType, "");
  showImage(content)
    // Strip out the file prefix when you convert to json.
    var json = {
       "requests": [
         { 
           "image": {
             "content": content 
           },
          "features": [
             {
               "type": type,
               "maxResults": 10
             }
          ]
        }
      ]
    }
    //console.log(JSON.stringify(json));
    json = JSON.stringify(json)

  //Vision AJAX Request
  $.ajax({
      type: 'POST',
      url: "https://vision.googleapis.com/v1/images:annotate?key=" + api_key,
      dataType: 'json',
      data: json,
      //Include headers, otherwise you get an odd 400 error.
      headers: {
        "Content-Type": "application/json",
      },
   
      success: function(data, textStatus, jqXHR) {
        displayJSON(data);
        console.log(data);
        //console.log(textStatus)
        //console.log(jqXHR)
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
  });
}

function showImage(base64){
  var image = $('<img style="height:100vh" src="data:image/jpeg;base64, '+ base64 +'" />');
  $('.uploaded').append(image);
}

//
$('#uploadImage').on('click', function(event){
  uploadFiles(event);
})








