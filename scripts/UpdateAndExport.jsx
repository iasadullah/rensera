#include "json2.js"
function main(inputPath, outputPath, mappingPath) {
    var dataId = app.scriptArgs.get("dataId"); // Get the data-id from the script arguments
  var text = app.scriptArgs.get("text")
  var myFile = new File(inputPath);
  var folderExists = true;
  var result = "";

  // Check if the file exists
  if (!myFile.exists) {
    result = "The file does not exist: " + inputPath;
    return result;
  }

  // Open the document
  var myDoc = app.open(myFile);

  // The mapping between the HTML elements and the InDesign elements
  var mapping = {};

  // Add a unique identifier to each text frame
  for (var i = 0; i < myDoc.textFrames.length; i++) {
    var textFrame = myDoc.textFrames[i];
    textFrame.label = i.toString(); // Use the index as the identifier

    if(dataId==textFrame.id)
    {
   $.writeln("Matched");        
        }
    else{
          $.writeln("Not matched"+typeof dataId+""+typeof textFrame.id); 
}
  }
  myDoc.close();



  return "Successful";
}

// The input, output, and mapping paths
var inputPath = "C:/Users/sulem/Desktop/Demo/server/uploads/template.indt";
var outputPath = "C:/Users/sulem/Desktop/Demo/server/generatedHtml/output.html";
var mappingPath = "C:/Users/sulem/Desktop/Demo/server/generatedHtml/mapping.json";

main(inputPath, outputPath, mappingPath);