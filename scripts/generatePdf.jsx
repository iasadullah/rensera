var argString1 = app.scriptArgs.get("arg1");
var argString2 = app.scriptArgs.get("arg2");
var filePath = app.scriptArgs.get("templateFile"); // get the template file path

// Check if arguments are provided
if (argString1 && argString2 && filePath) {
  // Log the names and values
  $.writeln("Argument 1: " + argString1);
  $.writeln("Argument 2: " + argString2);
  $.writeln("Template file path: " + filePath);

  // Now you can use argString1, argString2, and filePath in your script
  // ...
} else {
  $.writeln("Not all arguments provided.");
}

function ExportAsPDF(myFile) {
  try {
    app.documents
      .item(0)
      .exportFile(
        ExportFormat.pdfType,
        myFile,
        app.pdfExportPresets.item("[High Quality Print]")
      );
  } catch (e) {
    alert(e);
  }
}

function LoadDataIntoTemplate(doc) {
  // using script label to place data into placeholders
  for (var idx = 0; idx < doc.allPageItems.length; idx++) {
    var pageItem = doc.allPageItems[idx];
    // Editorial contents
    if (pageItem.constructor.name == "TextFrame") {
      // Get the label of the page item
      var label = pageItem.label;
      // Check if the label matches the pattern "placeholderX"
      var match = label.match(/placeholder(\d+)/);
      if (match) {
        // Get the argument number
        var argNum = match[1];
        // Get the new and old argument values
        var argValueNew = app.scriptArgs.get("arg" + argNum + "New");
        var argValueOld = app.scriptArgs.get("arg" + argNum + "Old");
        // If the new value is not the same as the old one and is not empty, update the contents of the page item
        if (argValueNew !== argValueOld && argValueNew !== "") {
          pageItem.contents = argValueNew;
        }
      }
    }
  }
}

function main() {
  for (var i = 1; i <= 100; i++) {
    // assuming a maximum of 100 arguments
    var argName = "arg" + i;
    if (app.scriptArgs.isDefined(argName)) {
      var argValue = app.scriptArgs.getValue(argName);
      $.writeln("Argument name: " + argName + ", value: " + argValue);
    }
  }

  var myTemplateFile = new File(filePath);

  var myPDFfile = new File(
    "D:/Office/SigmaSquare/renser-dev/rensera/Pdfs/Demo.pdf"
  );
  var doc = app.open(myTemplateFile);

  // get scriptArgs and update
  LoadDataIntoTemplate(doc);

  // Save the modified file over the existing template
  doc.save(myTemplateFile);

  // Export as PDF
  ExportAsPDF(myPDFfile);

  doc.close();
  $.write("PDF Exported");
}

main();
