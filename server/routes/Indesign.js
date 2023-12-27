const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const db = require("../models/Indesign");
const axios = require("axios");
const xml2js = require("xml2js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { check, validationResult } = require("express-validator");
const config = require("../Config");

//generatingHtml of selected
router.post("/generateHtml", async (req, res) => {
  // const { arg1, arg2, arg3, templateFile } = req.body;

  // Create the SOAP envelope with the arguments
  const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
      <soapenv:Body>
        <soap:RunScript>
          <runScriptParameters>
            <scriptLanguage>javascript</scriptLanguage>
            <scriptFile>${config.scriptFilePath}/generatePdf.jsx</scriptFile>
            <scriptArgs>
              <name>arg1</name>
              <value>Asad</value>
            </scriptArgs>
            <scriptArgs>
              <name>arg2</name>
              <value>Ullah</value>
            </scriptArgs>
            <scriptArgs>
              <name>arg3</name>
              <value>shah</value>
            </scriptArgs>
            <scriptArgs>
            <name>templateFile</name>
            <value>${config.uploadPath}/uploads/template.indt</value>
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
    const unzip = require("node-unzip-2");
    const epubPath = path.join("C:/Users/sulem/Desktop/Demo/Pdfs/Demo.epub");
    if (fs.existsSync(epubPath)) {
      fs.createReadStream(epubPath)
        .pipe(unzip.Extract({ path: "output/path" }))
        .on("close", function () {
          // EPUB has been extracted, you can now send the HTML file
        });
    } else {
      res.status(404).json({ message: "EPUB not found" });
    }
    es.status(404).json({ message: "HTML not found" });

    // const pdfPath = path.join("C:/Users/sulem/Desktop/Demo/Pdfs/demo.pdf");
    // if (fs.existsSync(pdfPath)) {
    //   // Set the response headers
    //   res.setHeader("Content-Type", "application/pdf");
    //   res.setHeader("Content-Disposition", `attachment; filename=${arg1}.pdf`);

    //   // Send the PDF file as a response
    //   const readStream = fs.createReadStream(pdfPath);
    //   readStream.pipe(res);

    //   // Delete the file after it has been sent
    //   res.on("finish", () => {
    //     fs.unlink(pdfPath, (err) => {
    //       if (err) console.error("Error deleting file:", err);
    //     });
    //   });
    // } else {
    //   res.status(404).json({ message: "PDF not found" });
    // }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error generating PDF", error });
  }
});
//get templateList
router.get("/templateList", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM templates");
    const templates = await Promise.all(
      result.rows.map(async (template) => {
        // Construct the directory path
        const dirPath = path.join(__dirname, "..", "templates");

        // Read the directory
        const files = fs.readdirSync(dirPath);

        // Find the file that matches the template name
        const matchingFile = files.find(
          (file) => path.basename(file, path.extname(file)) === template.name
        );

        // Add the matching file to the template
        return {
          ...template,
          image: `http://localhost:4000/public/thumbnails/${template.image}`,
          filename: matchingFile ? path.join(dirPath, matchingFile) : null,
        };
      })
    );

    res.json({ status: 200, response: templates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//post template list
router.post(
  "/createTemplate",
  [
    // Validate input
    check("name").notEmpty().withMessage("Name is required"),
    check("image").notEmpty().withMessage("Image is required"),
    check("description").notEmpty().withMessage("Description is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, errors: errors.array() });
      }

      const { name, image, description } = req.body;

      const buffer = Buffer.from(image, "base64");
      const filename = new Date().toISOString().replace(/:/g, "-") + ".png";
      const filePath = path.join(config.imagePath, filename);

      fs.writeFile(filePath, buffer, async (err) => {
        if (err) {
          return next(err);
        }

        try {
          const result = await db.query(
            "INSERT INTO templates (name, image, description) VALUES ($1, $2, $3) RETURNING *",
            [name, filename, description]
          );
          res.status(201).json({
            status: 201,
            data: result.rows[0],
          });
        } catch (err) {
          if (err.constraint === "templates_name_unique") {
            res
              .status(400)
              .json({ status: 400, error: "Template name already exists" });
          } else {
            next(err);
          }
        }
      });
    } catch (err) {
      next(err);
    }
  }
);

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

//upload file meta data
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
                  <scriptFile>${
                    config.scriptFilePath
                  }/InDesignMeta.jsx</scriptFile>
                  <scriptArgs>
                      <name>arg1</name>
                      <value>${config.uploadPath + filePath}</value>
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

//create new project
router.post("/createNewProject", async (req, res) => {
  const { projectName, creatorFirstName, creatorLastName, templateId } =
    req.body;

  // Validate the incoming data
  if (!projectName || !creatorFirstName || !creatorLastName || !templateId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Insert the project into the database
    const result = await db.query(
      "INSERT INTO newprojects (project_name, creator_first_name, creator_last_name, template_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [projectName, creatorFirstName, creatorLastName, templateId]
    );

    // Return the inserted project
    res.status(201).json({
      status: 201,
      response: "Project created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create project" });
  }
});

//templatefile meta data
router.get("/templateFileMetaData", async (req, res) => {
  const requestedFile = decodeURIComponent(req.query.filename);
  // console.log("this is requested file", requestedFile);
  const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
      <soapenv:Body>
          <soap:RunScript>
              <runScriptParameters>
                  <scriptLanguage>javascript</scriptLanguage>
                  <scriptFile>${config.scriptFilePath}/InDesignMeta.jsx</scriptFile>
                  <scriptArgs>
                      <name>arg1</name>
                      <value>${requestedFile}</value>
                  </scriptArgs>
              </runScriptParameters>
          </soap:RunScript>
      </soapenv:Body>
  </soapenv:Envelope>`;

  try {
    const response = await axios.post("http://localhost:1234", xmls, {
      headers: { "Content-Type": "text/xml" },
      responseType: "text",
    });

    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return res.status(500).json({ message: "Error parsing XML" });
      }

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
        status: 200,
        message: "File processed successfully",
        response: scriptResult,
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, message: "Error processing file", error });
  }
});

//save changes

router.post("/updateTextFrames", (req, res) => {
  const selections = req.body;

  const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
      <soapenv:Body>
          <soap:RunScript>
              <runScriptParameters>
                  <scriptLanguage>javascript</scriptLanguage>
                  <scriptFile>${
                    config.scriptFilePath
                  }/SaveTextFrames.jsx</scriptFile>
                  <scriptArgs>
                      <name>arg1</name>
                      <value>${JSON.stringify(selections)}</value>
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
          return res
            .status(500)
            .json({ status: 500, message: "Error parsing XML" });
        }

        res.status(200).json({
          status: 200,
          message: "File processed successfully",
          data: result,
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res
        .status(500)
        .json({ status: 500, message: "Error processing file", error });
    });
});

//generatingpdf  of selected
router.post("/generatePdfTest", async (req, res) => {
  console.log("this is req.body", req.body);
  let args = req.body.args;
  let filePath = args.filePath; // get filePath from args
  let scriptArgs = "";
  let argCounter = 1;
  for (let key in args) {
    if (key === "filePath") continue; // skip filePath
    let arg = args[key];
    if (arg.hasOwnProperty("textFrameSelect")) {
      scriptArgs += `
        <scriptArgs>
          <name>arg${argCounter}New</name>
          <value>${arg["textFrameSelect"]}</value>
        </scriptArgs>
        <scriptArgs>
          <name>arg${argCounter}Old</name>
          <value>${arg["textFrameOriginal"]}</value>
        </scriptArgs>
      `;
      argCounter++;
    }
  }
  console.log("Script arguments:", scriptArgs);
  // Construct the full SOAP envelope
  const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
      <soapenv:Body>
        <soap:RunScript>
          <runScriptParameters>
            <scriptLanguage>javascript</scriptLanguage>
            <scriptFile>${config.scriptFilePath}/generatePdf.jsx</scriptFile>
            ${scriptArgs}
            <scriptArgs>
            <name>templateFile</name>
            <value>${filePath}</value>
            </scriptArgs>
          </runScriptParameters>
        </soap:RunScript>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
  console.log("SOAP Envelope:", soapEnvelope);
  // Send the SOAP request
  try {
    const response = await axios({
      url: "http://localhost:1234",
      method: "post",
      data: soapEnvelope,
      headers: { "Content-Type": "text/xml" },
    });

    // Handle the SOAP response
    const { data } = response;
    console.log("SOAP response:", data);

    // Parse the SOAP response
    const parser = new xml2js.Parser();
    const soapResponse = await parser.parseStringPromise(data);

    // Send a response back to the client
    res.status(200).json({
      status: 200,
      message: "PDF generation request sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Failed to send PDF generation request",
    });
  }
});

// Endpoint to get the exported HTML
router.get("/html", (req, res) => {
  const html = fs.readFileSync(
    path.join(__dirname, "../public/output/output.html"),
    "utf8"
  );

  const mapping = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../public/output/mapping.json"),
      "utf8"
    )
  );

  // Parse the HTML
  const dom = new JSDOM(html);

  // Get all p elements
  const elements = dom.window.document.getElementsByTagName("p");

  // Add data-id attributes to the elements
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const dataId = mapping[i.toString()];
    if (dataId !== undefined) {
      element.setAttribute("data-id", dataId);
    }
  }

  // Serialize the updated HTML
  const updatedHtml = dom.serialize();

  res.send({ html: updatedHtml, mapping });
});

// Endpoint to receive the updated HTML

/////
router.post("/update", async (req, res) => {
  const { dataId, text } = req.body;

  const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
  <soapenv:Body>
    <soap:RunScript>
      <runScriptParameters>
        <scriptLanguage>javascript</scriptLanguage>
        <scriptFile>${config.scriptFilePath}/UpdateAndExport.jsx</scriptFile>
   
        <scriptArgs>
          <name>dataId</name>
          <value>${dataId}</value>
        </scriptArgs>
        <scriptArgs>
          <name>text</name>
          <value>${text}</value>
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
          return res
            .status(500)
            .json({ status: 500, message: "Error parsing XML" });
        }

        res.status(200).json({
          status: 200,
          message: "Text frame updated and document exported successfully",
          data: result,
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({
        status: 500,
        message: "Error updating text frame and exporting document",
        error,
      });
    });
});
module.exports = router;
