//OpenDocument.jsx
//An InDesign Server JavaScript
//Opens an existing document. You’ll have to fill in your own file path.
function main(){
var fileName=app.scriptArgs.getValue("arg1")
$.writeln("File name is...."+fileName)
var myFile = new File("C:/Users/sulem/Desktop/Demo/server/"+fileName);
var folderExists = true;
var result = "";

// create the file if it does not exist
if(!myFile.exists) {
	// create the parent folder if necessary
	if(!myFile.parent.exists){ 
		folderExists = myFile.parent.create(); 
	}
	if(folderExists) {
		// create a document, save it, and close it
		var myDocument = app.documents.add();
		myDocument = myDocument.save(myFile);
		myDocument.close();
	} else {
		result = "Unable to create the folder:  " + myFile.path;
	}
}

if (folderExists) {

	// OPEN
	var myDoc = app.open(myFile);

	


		// Export the page to FXL HTML
		with (myDoc.htmlFXLExportPreferences) {
			epubPageRangeFormat = PageRangeFormat.EXPORT_ALL_PAGES
//			epubPageRangeFormat = PageRangeFormat.EXPORT_PAGE_RANGE
//			epubPageRange = "1-2";
		}
    var outPutPath="C:/Users/sulem/Desktop/Demo/server/generatedHtml/";
    var myDocBaseName="something"
		myDoc.exportFile(ExportFormat.HTMLFXL, new File(outPutPath + "output.html"));
return result="Successful";
}

}
main();