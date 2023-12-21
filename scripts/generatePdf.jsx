// Get the argument strings
var argString1 = app.scriptArgs.get("arg1");
var argString2 = app.scriptArgs.get("arg2");
var templateFile = app.scriptArgs.get("templateFile");
// Check if arguments are provided
if (argString1 && argString2) {
    // Log the names and values
    $.writeln("Argument 1: " + argString1);
    $.writeln("Argument 2: " + argString2);
    $.writeln("templateFile : " + templateFile);


    // Now you can use argString1 and argString2 in your script
    // ...
} else {
    $.writeln("Not all arguments provided.");
}

function ExportAsPDF(myFile){  
    try{
       	app.documents.item(0).exportFile(ExportFormat.pdfType, myFile, app.pdfExportPresets.item("[High Quality Print]"));
    }catch(e){
    	alert(e);
    };  
}
function LoadDataIntoTemplate(doc){
	// using script label to place data into placeholders
	for (var idx = 0; idx < doc.allPageItems.length; idx++)
	{
		var pageItem = doc.allPageItems[idx];
		// Editorial contents
		if (pageItem.constructor.name == "TextFrame" && pageItem.label == "placeholder1")
		{
		  pageItem.contents = app.scriptArgs.get("arg1");
		}
		if (pageItem.constructor.name == "TextFrame" && pageItem.label == "placeholder2")
		{
		  pageItem.contents = app.scriptArgs.get("arg2");
		}
		if (pageItem.constructor.name == "TextFrame" && pageItem.label == "placeholder3")
		{
		  pageItem.contents = app.scriptArgs.get("arg3");
		}
	}
}
function main(){
	var myTemplateFile = new File("C:/Users/sulem/Desktop/Demo/server/uploads/"+templateFile);
	var myPDFfile = new File("C:/Users/sulem/Desktop/Demo/Pdfs/"+argString1+".pdf");
	var doc = app.open(myTemplateFile);
	// get scriptArgs and update
	LoadDataIntoTemplate(doc);
	// Export as PDF
	ExportAsPDF(myPDFfile);
	doc.close();
	$.write("PDF Exported");
}
main();
