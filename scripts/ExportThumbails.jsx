#include "json2.js"
// OpenDocumentsWithThumbnails/.jsx
// An InDesign Server JavaScript
// Opens all existing documents in a specific folder and generates one thumbnail of the first page for each document.
function main(){
  var fileName = app.scriptArgs.getValue("arg1");
  var filePath=fileName.replace(/[^\\\/]+$/, '');
  $.writeln("The file name  is...:"+ filePath)
  
  var configFile = File("C:/Users/Administrator/Desktop/rensera/scripts/config.json");
  configFile.open("r");
  var configData = configFile.read();
  configFile.close();
  // Parse the JSON data
  var config = JSON.parse(configData);
  
  
  
  var folderPath = filePath; // Specify the folder path containing your InDesign files
  var pdfFilePath = filePath;
  var thumbnailsPath = filePath;
  
  var fileList = [];
  var folder = new Folder(folderPath);
  var namesList=[];
  if (folder.exists) {
    var fileTypes = ["*.indd", "*.indx", "*.indt"];
    var fileList = [];
    var processedDocuments = {}; // To keep track of processed documents
  
    // Collect files of each type
    for (var i = 0; i < fileTypes.length; i++) {
      var fileType = fileTypes[i];
      var typeFiles = folder.getFiles(fileType);
      fileList = fileList.concat(typeFiles);
    }
  
    var newFolder = new Folder(thumbnailsPath);
  
    if (!newFolder.exists) {
      // Create the new folder if it doesn't exist
      newFolder.create();
    }
  
    // ...
    for (var i = 0; i < fileList.length; i++) {
      var myFile = fileList[i];
      $.writeln("Array is....." + fileList[i].name);
   var cleanedFileName = myFile.name.replace(/%20/g, ' ')
          // Add the cleaned file name to your alert message
          alert("The File's name is: " + cleanedFileName);
  
          namesList.push(cleanedFileName);
  
      // Check if this document has been processed already
      if (!processedDocuments[myFile.toString()]) {
        // OPEN
        var myDocument = app.open(myFile);
        $.writeln("List is....." + namesList);
   //namesList.push(myFile.name);
        // Create a thumbnail of the first page
        var thumbnailFileName = myFile.name.replace(/\.indt$/, '')
        + ".jpg"; // Change the file format if needed
        var thumbnailPath = newFolder + "/" + thumbnailFileName;
        var thumbnailFile = new File(thumbnailPath);
        // Get a reference to the first page
        var firstPage = myDocument.pages[0];
  
        // Set export options
  
        // Export the first page as a JPEG
        myDocument.exportFile(
          ExportFormat.pdfType,
          File(pdfFilePath + myFile.name.replace(/\.(indt|indd)$/, '')
          + ".pdf")
        );
  
        // Close the document
        myDocument.close(SaveOptions.NO);
  
        // Mark this document as processed
        processedDocuments[myFile.toString()] = true;
      }
    }
  
    generateImages();
    //    alert("Thumbnails generated for the first page of each unique template in the folder."+pageItem+"HELLO"+firstPage)
  } else {
    alert("The specified folder does not exist.");
  }
  //pageItem
  
  function generateImages() {
    var inputFolderPath = Folder(pdfFilePath);
  
    // Specify the output folder path for images
    var outputFolderPath = Folder(thumbnailsPath);
  
    // Check if the input folder exists
    if (inputFolderPath.exists) {
      // Create the output folder if it doesn't exist
      if (!outputFolderPath.exists) {
        outputFolderPath.create();
      }
  
      // Open a new document
      var tempDoc = app.documents.add();
  
      // Get all PDF files in the specified folder
      var pdfFiles = inputFolderPath.getFiles("*.pdf");
     
      if (pdfFiles.length > 0) {
        // Loop through each PDF file
        for (var i = 0; i < pdfFiles.length; i++) {
          // Place the PDF file in the temporary document
          var pdfFile = pdfFiles[i];
          var pdfPage = tempDoc.pages.add();
          var pdfRect = pdfPage.place(pdfFile)[0];
  
          // Set the dimensions for the image (adjust as needed)
          var imageWidth = 300; // Set the width of the image
          var imageHeight =
            (pdfRect.geometricBounds[2] / pdfRect.geometricBounds[3]) *
            imageWidth;
  
          // Resize the placed PDF to fit the image dimensions
          pdfRect.geometricBounds = [0, 0, imageHeight, imageWidth];
          var now = new Date();
          var timestamp = now.getFullYear() + '-' +
            ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
            ('0' + now.getDate()).slice(-2) + 'T' +
            ('0' + now.getHours()).slice(-2) + '-' +
            ('0' + now.getMinutes()).slice(-2) + '-' +
            ('0' + now.getSeconds()).slice(-2) + '.' +
            now.getMilliseconds() + 'Z';
          // Export the first page as a PNG
          var pngFilePath = new File(
            newFolder + "/" +  myFile.name.replace(/\.(indt|indd)$/, '')+ ".png"
          );
          pdfRect.exportFile(ExportFormat.PNG_FORMAT, pngFilePath);
        }
  
        // Close the temporary document without saving changes
        tempDoc.close(SaveOptions.NO);
  
        alert("Images of the first pages generated and saved successfully!");
      } else {
        alert("No PDF files found in the specified folder.");
      }
    } else {
      alert("Specified input folder does not exist.");
    }
  
    // Function to convert PNG to JPEG
    return namesList;
  }
  
}
main()