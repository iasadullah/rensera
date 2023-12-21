const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const xml2js = require("xml2js");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//creating instance of express router to access app methods from server.js

const router = express.Router();

// List all files
router.get("/filesList", (req, res) => {
  const directoryPath = path.join(__dirname, "..", "uploads");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan directory", err });
    }

    const filesList = files.map((file) => ({ name: file }));
    res.json({ data: filesList });
  });
});

//file meta data
router.get("/fileMetaData/:filename", (req, res) => {
  const directoryPath = path.join(__dirname, "..", "uploads");
  const requestedFile = req.params.filename;

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan directory", err });
    }

    const matchingFiles = files.filter((file) => file.includes(requestedFile));

    if (matchingFiles.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    let filePath = path.join(directoryPath, matchingFiles[0]);
    filePath = filePath.replace(/\\/g, "/");
    filePath = "/uploads" + filePath.split("/uploads")[1];
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
      <soapenv:Body>
          <soap:RunScript>
              <runScriptParameters>
                  <scriptLanguage>javascript</scriptLanguage>
                  <scriptFile>C:/Users/sulem/Desktop/Demo/scripts/InDesignMeta.jsx</scriptFile>
                  <scriptArgs>
                      <name>arg1</name>
                      <value>${filePath}</value>
                  </scriptArgs>
              </runScriptParameters>
          </soap:RunScript>
      </soapenv:Body>
  </soapenv:Envelope>`;

    axios
      .post("http://localhost:1234", xmls, {
        headers: { "Content-Type": "text/xml" },
      })
      .then((response) => {
        xml2js.parseString(response.data, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
            res.status(500).json({ message: "Error parsing XML" });
          } else {
            const scriptResultData =
              result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
                "IDSP:RunScriptResponse"
              ][0]["scriptResult"][0]["data"][0]["_"];

            let scriptResult;

            try {
              scriptResult = JSON.parse(scriptResultData);
            } catch (error) {
              scriptResult = scriptResultData;
            }

            res.json({
              message: "File processed successfully",
              data: scriptResult,
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ message: "Error processing file", error });
      });
  });
});

//generatingPdf
router.post("/generatePdfs", async (req, res) => {
  const { arg1, arg2, arg3, templateFile } = req.body;

  // Create the SOAP envelope with the arguments
  const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
      <soapenv:Body>
        <soap:RunScript>
          <runScriptParameters>
            <scriptLanguage>javascript</scriptLanguage>
            <scriptFile>C:/Users/sulem/Desktop/Demo/scripts/generatePdf.jsx</scriptFile>
            <scriptArgs>
              <name>arg1</name>
              <value>${arg1}</value>
            </scriptArgs>
            <scriptArgs>
              <name>arg2</name>
              <value>${arg2}</value>
            </scriptArgs>
            <scriptArgs>
              <name>arg3</name>
              <value>${arg3}</value>
            </scriptArgs>
            <scriptArgs>
            <name>templateFile</name>
            <value>${templateFile}</value>
          </scriptArgs>
          </runScriptParameters>
        </soap:RunScript>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  try {
    // Send the SOAP request to the InDesign server
    const response = await axios.post("http://localhost:1234", soapEnvelope, {
      headers: { "Content-Type": "text/xml" },
    });
    const pdfPath = path.join(
      "C:/Users/sulem/Desktop/Demo/Pdfs",
      `${arg1}.pdf`
    );
    if (fs.existsSync(pdfPath)) {
      // Set the response headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${arg1}.pdf`);

      // Send the PDF file as a response
      const readStream = fs.createReadStream(pdfPath);
      readStream.pipe(res);

      // Delete the file after it has been sent
      res.on("finish", () => {
        fs.unlink(pdfPath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      });
    } else {
      res.status(404).json({ message: "PDF not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error generating PDF", error });
  }
});

//post a new request
router.post("/", (req, res) => {
  res.json({ message: "Post a  new workout" });
});

//delete request
router.delete("/:id", (req, res) => {
  res.json({ message: "delete a   workout" });
});

//upload file  request
router.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);

  const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
    <soapenv:Body>
        <soap:RunScript>
            <runScriptParameters>
                <scriptLanguage>javascript</scriptLanguage>
                <scriptFile>C:/Users/sulem/Desktop/Demo/scripts/InDesignMeta.jsx</scriptFile>
                <scriptArgs>
                    <name>arg1</name>
                    <value>${req.file.path}</value>
                </scriptArgs>
            </runScriptParameters>
        </soap:RunScript>
    </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const response = await axios.post("http://localhost:1234", xmls, {
      headers: { "Content-Type": "text/xml" },
    });

    console.log("this api", response.data);
    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        res.status(500).json({ message: "Error parsing XML" });
      } else {
        // Extract the scriptResult data
        const scriptResultData =
          result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
            "IDSP:RunScriptResponse"
          ][0]["scriptResult"][0]["data"][0]["_"];

        let scriptResult;

        try {
          // Try to parse the scriptResult data as JSON
          scriptResult = JSON.parse(scriptResultData);
        } catch (error) {
          // If the scriptResult data is not valid JSON, use it as is
          scriptResult = scriptResultData;
        }

        // Send the scriptResult data back to the client
        res.json({ message: "File uploaded successfully", data: scriptResult });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error uploading file to InDesign server" });
  }
});

//uploading file and generating its html
router.post("/uploadFile", upload.single("file"), async (req, res) => {
  console.log(req.file);

  const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
    <soapenv:Body>
        <soap:RunScript>
            <runScriptParameters>
                <scriptLanguage>javascript</scriptLanguage>
                <scriptFile>C:/Users/sulem/Desktop/Demo/scripts/convertToHtml.jsx</scriptFile>
                <scriptArgs>
                    <name>arg1</name>
                    <value>${req.file.path}</value>
                </scriptArgs>
            </runScriptParameters>
        </soap:RunScript>
    </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const response = await axios.post("http://localhost:1234", xmls, {
      headers: { "Content-Type": "text/xml" },
    });

    //console.log("this api",response.data);
    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        res.status(500).json({ message: "Error parsing XML" });
      } else {
        // Extract the scriptResult data
        const scriptResultData =
          result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
            "IDSP:RunScriptResponse"
          ][0]["scriptResult"][0]["data"][0]["_"];

        let scriptResult;

        try {
          scriptResult = JSON.parse(scriptResultData);
        } catch (error) {
          scriptResult = scriptResultData;
        }

        res.json({ message: "File uploaded successfully", data: scriptResult });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Error uploading file to InDesign server" });
  }
});

module.exports = router;
