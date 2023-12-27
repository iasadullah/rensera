// SaveTextFrames.jsx

// Parse the script arguments to get the updated text frames.
var selections = JSON.parse(app.scriptArgs.getValue("arg1"));

// Get the active document.
var doc = app.activeDocument;

// Loop over the selections and update the text frames.
for (var index in selections) {
  var selectedValue = selections[index];

  // Get the text frame by its index.
  var textFrame = doc.textFrames[index];

  // Update the contents of the text frame.
  textFrame.contents = selectedValue;
}

// Save the document to a new file.
