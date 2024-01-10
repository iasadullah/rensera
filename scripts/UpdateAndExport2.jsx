#include "json2.js"

function main() {
    $.writeln("update and export 2");
    var allArguments = app.scriptArgs.getValue("allArguments");
    $.writeln("allArguments" + allArguments);
    var inputPath = app.scriptArgs.getValue("fileName");
    $.writeln("inputPath" + inputPath);
    var outputPaths = app.scriptArgs.getValue("outputPath");
    $.writeln("outputPath" + outputPaths);
    var indesignName = app.scriptArgs.getValue("indesignName");
    $.writeln("indesignName" + indesignName);
    // Ensure outputPaths ends with a backslash
    outputPaths = outputPaths + (outputPaths.charAt(outputPaths.length - 1) === "\\" ? "" : "\\");

    $.writeln("outputPath" + outputPaths);
    // Parse XML string to XML object
    var xmlData = new XML(allArguments);

    // Extract items from XML object
    var items = xmlData.item;

    if (items) {
        // Process each item
        var dataArray = [];

        for (var i = 0; i < items.length(); i++) {
            var item = items[i];

            // Extract data_id and value from the item
            var data_id = item.data_id.toString();
            var value = item.value.toString();

            // Create an object with the extracted values
            var dataObject = {
                data_id: data_id,
                value: value,
            };

            // Push the object to the dataArray
            dataArray.push(dataObject);
        }

        // Log the resulting array of objects
        $.writeln("This is array: " + dataArray);
    } else {
        $.writeln("No items found in the XML.");
    }

    // The input, output, and mapping paths
    //var inputPath = "C:/Users/sulem/Desktop/Demo/server/uploads/Business Proposal.indd";
    var outputPath = "C:/Users/Administrator/Desktop/";

    var myFile = new File(inputPath + "\\" + indesignName + ".indd"); // Construct inputPath
    var result = "";

    // Check if the file exists
    if (!myFile.exists) {
        result = "The file does not exist: " + inputPath;
        return result;
    }

    // Open the document
    var myDoc = app.open(myFile);

    // Iterate through all matches in the string
    for (var i = 0; i < myDoc.textFrames.length; i++) {
        var myTextFrame = myDoc.textFrames[i];

        for (var k = 0; k < dataArray.length; k++) {
            var dataItem = dataArray[k];

            if (myTextFrame.id == dataItem.data_id) {
                $.writeln("Matched " + myTextFrame.id + " " + dataItem.data_id);
                myTextFrame.contents = dataItem.value;
            }
            //else {
            //$.writeln("Not matched " + myTextFrame.id + " " + dataItem.data_id);
            //}
        }
    }

    // Save the document with the specified indesignName in the same directory
var outputDirectory = new Folder(outputPaths);
outputDirectory.create(); // Create the directory if it doesn't exist

var outputFilePath = new File(outputDirectory.fsName + "/" + indesignName + ".indd");

// Check if the file is already open
if (outputFilePath.open("r")) {
    outputFilePath.close();
}

// Save the document
myDoc.save(outputFilePath);

// Close the document
myDoc.close();

return "Successful";
}

main();
