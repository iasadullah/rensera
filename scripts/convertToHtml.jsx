#include "json2.js"

var fileName = app.scriptArgs.getValue("arg1");
var fileNameTemaplate = app.scriptArgs.getValue("fileName");

$.writeln("fileNam<><><><><><><>e" + fileName, fileNameTemaplate);

function main(inputPath, outputFolderPath, mappingPath) {
  var myFile = new File(inputPath);
  var folderExists = true;
  var result = "";

  // Check if the file exists
  if (!myFile.exists) {
    result = "The file does not exist: " + inputPath;
    return result;
  }

  // Create a folder with the fileNameTemaplate
  var outputFolder = new Folder(outputFolderPath + fileNameTemaplate);

  // Check if the folder already exists, create it if not
  if (!outputFolder.exists) {
    outputFolder.create();
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

  var htmlFile = new File(outputFolder + "/output.html");
  myDoc.exportFile(ExportFormat.HTMLFXL, htmlFile);

  // Close the document
  myDoc.close();

  // Save the mapping to a file
  var mappingFile = new File(outputFolder + "/mapping.json");
  mappingFile.open('w');
  mappingFile.write(JSON.stringify(mapping));
  mappingFile.close();

  return "Successful";
}

var configFile = File("C:/Users/Administrator/Desktop/rensera/scripts/config.json");
configFile.open("r");
var configData = configFile.read();
configFile.close();

// Parse the JSON data
var config = JSON.parse(configData);

// The input, output, and mapping paths
var inputPath = fileName;
var outputFolderPath = config.outputUpdated;
var mappingPath = config.outputPathHTml + "mapping.json";

main(inputPath, outputFolderPath, mappingPath);
