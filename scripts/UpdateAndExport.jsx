#include "json2.js"

function main() {
    var allArguments = app.scriptArgs.getValue("allArguments");
    //var fileName=app.scriptArgs.getValue("fileName")
    var fileName
    $.writeln("allArguments" + allArguments);
  var isDrupal;
 var articleTitle;
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
fileName=item[0].fileName.toString()
isDrupal=item[0].isDrupal.toString()
articleTitle=item[0].articleTitle.toString()
            // Create an object with the extracted values
            var dataObject = {
                data_id: data_id,
                value: value,
            };

            // Push the object to the dataArray
            dataArray.push(dataObject);
        }

        // Log the resulting array of objects
        $.writeln("This is array: " + fileName);
    } else {
        $.writeln("No items found in the XML.");
    }

    var configFile = File("C:/Users/Administrator/Desktop/rensera/scripts/config.json");
    configFile.open("r");
    var configData = configFile.read();
    configFile.close();
    // Parse the JSON data
    var config = JSON.parse(configData);
    // The input, output, and mapping paths
    var inputPath = fileName;
    var outputPath = config.outputPathHTml+"Pdfs/"+articleTitle+".pdf";

    var myFile = new File(inputPath);
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
            } else {
                $.writeln("Not matched " + myTextFrame.id + " " + dataItem.data_id);
            }
        }
    }
    var myTemplateFile = new File(fileName);
    // Export as PDF
    myDoc.exportFile(ExportFormat.PDF_TYPE, new File(outputPath));
    if(isDrupal!=="true"){

        myDoc.save(myTemplateFile);
    }else{
        $.writeln("Drupal is true");

    }
    myDoc.close();

    return "Successful";
}

main();