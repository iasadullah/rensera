#include "json2.js"
function main(inputPath, outputPath, mappingPath) {
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

    // Add the mapping between the HTML data-id and the InDesign ID
    mapping[i] = textFrame.id;
  }

  // Export the document to FXL HTML
  with (myDoc.htmlFXLExportPreferences) {
    epubPageRangeFormat = PageRangeFormat.EXPORT_ALL_PAGES;
  }

  myDoc.exportFile(ExportFormat.HTMLFXL, new File(outputPath));

  // Close the document
  myDoc.close();

  // Save the mapping to a file
  var mappingFile = new File(mappingPath);
  mappingFile.open('w');
  mappingFile.write(JSON.stringify(mapping));
  mappingFile.close();

  return "Successful";
}

// The input, output, and mapping paths
var inputPath = "C:/Users/sulem/Desktop/Demo/server/uploads/template.indt";
var outputPath = "C:/Users/sulem/Desktop/Demo/server/generatedHtml/output.html";
var mappingPath = "C:/Users/sulem/Desktop/Demo/server/generatedHtml/mapping.json";

main(inputPath, outputPath, mappingPath);