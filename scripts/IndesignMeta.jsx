#include "json2.js"

function main(){
var fileName = app.scriptArgs.getValue("arg1");
$.writeln("fileName" + fileName);

var myFile = new File( fileName);
var result = {};
var resultString ;
// Check if the file exists
if (myFile.exists) {
  // OPEN the InDesign document
  var myDoc = app.open(myFile);

  // Check if the document is saved
  if (myDoc.saved) {
    // Get the document properties for saved documents
    result.document = {
      name: myDoc.name,
      path: myDoc.fullName,
      pageCount: myDoc.pages.length
    };
  } else {
    // Handle unsaved documents
    result.document = {
      name: "Unsaved Document",
      path: "N/A",
      pageCount: myDoc.pages.length
    };
  }

  // Initialize arrays to store text content and image links
  result.textFrames = [];
  result.imageLinks = [];

  // Initialize a counter for the text frame IDs
  var textFrameId = 1;
  var mapping = {};
  // Loop through all text frames in the document
  for (var i = 0; i < myDoc.textFrames.length; i++) {
    var myTextFrame = myDoc.textFrames[i];
    $.writeln("COntent"+myTextFrame.contents)
        $.writeln("COntent ID::"+myTextFrame.id)
    mapping[i] = myTextFrame.id;
    var textFrameData = {
      id: textFrameId++, // Assign the current value of the counter as the ID and then increment the counter
      contents: myTextFrame.contents,
      geometricBounds: myTextFrame.geometricBounds,
      data_id:mapping[i]
     
    };
    result.textFrames.push(textFrameData);
  }

  // Loop through all image links in the document
  for (var j = 0; j < myDoc.links.length; j++) {
    var link = myDoc.links[j];
    var linkData = {
      name: link.name,
      filePath: link.filePath
    };
    result.imageLinks.push(linkData);
  }

  // Close the document
  myDoc.close(SaveOptions.NO);

  // Convert the result object to a JSON-like string
   resultString = JSON.stringify(result, null, 2); // The third parameter (2) adds indentation for better readability

  // Log the JSON-like string or return it as needed
  //$.writeln(resultString);
  resultString
} else {
  result.error = "File not found.";
  $.writeln(result.error);
}
return resultString;}
main();