const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const fss = require("fs").promises;
const db = require("../models/Indesign");
const axios = require("axios");
const xml2js = require("xml2js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fse = require("fs-extra");
const multer = require("multer");
const { check, validationResult } = require("express-validator");
const config = require("../Config");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(
      __dirname,
      "..",
      "public",
      "templates",
      req.query.template
    );
    fs.exists(dir, (exist) => {
      if (exist) {
        return cb(new Error("Template already exists"), "");
      } else {
        return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir));
      }
    });
  },
  filename: function (req, file, cb) {
    const fileName = `${req.query.template}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const dir = path.join(
      __dirname,
      "..",
      "public",
      "templates",
      req.query.template
    );
    fs.exists(dir, (exist) => {
      if (exist) {
        cb(new Error("Template already exists"));
      } else {
        cb(null, true);
      }
    });
  },
});

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
    // Get all projects from the database
    const result = await db.query("SELECT * FROM templates");

    // Map over the projects and add the file name and image to each project
    const projects = result.rows.map((project) => {
      // Check if template_name is not null
      if (!project.template_name) {
        return {
          ...project,
          fileName: "",
          image: "",
        };
      }

      // Construct the directory path for the project in the public folder
      const projectDir = path.join(
        __dirname,
        "..",
        "public",
        "templates",
        project.template_name
      );

      let fileName = "";
      let image = "";
      // Check if the directory exists before reading it
      if (fs.existsSync(projectDir)) {
        // Read the directory and get the first file name
        const files = fs.readdirSync(projectDir);
        fileName = files.find((file) => path.extname(file) === ".indt");
        const imageFile = files.find((file) =>
          [".jpeg", ".jpg", ".png"].includes(path.extname(file))
        );
        if (imageFile) {
          image = `http://localhost:4000/public/templates/${project.template_name}/${imageFile}`;
        }
      }

      // Add the file name and image to the project
      return { ...project, fileName, image };
    });

    // Return the projects
    res.status(200).json({
      status: 200,
      data: projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not get templates" });
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

router.post("/createNewProject", async (req, res) => {
  const {
    projectName,
    creatorFirstName,
    creatorLastName,
    office,
    leadpracticegroup,
    industry,
    team,
    templateId,
  } = req.body;
  // Validate the incoming data
  if (!projectName || !creatorFirstName || !creatorLastName || !templateId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create the directory for the project
    const projectDir = path.join(
      __dirname,
      "..",
      "public",
      "projects",
      projectName
    );

    // If the directory already exists, return an error
    if (fs.existsSync(projectDir)) {
      return res
        .status(400)
        .json({ error: "Project directory already exists" });
    }

    // Create the directory
    fs.mkdirSync(projectDir, { recursive: true });

    // Insert the project into the database with the path of the created folder
    const result = await db.query(
      "INSERT INTO newprojects (project_name, creator_first_name, creator_last_name, template_id, created_at, filepath,office,leadpracticegroup,industry,team) VALUES ($1, $2, $3, $4, NOW(), $5,$6,$7,$8,$9) RETURNING *",
      [
        projectName,
        creatorFirstName,
        creatorLastName,
        templateId,
        projectDir,
        office,
        leadpracticegroup,
        industry,
        team,
      ]
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
//getAllofficesList
router.get("/allOfficesList", async (req, res) => {
  try {
    // Get all projects from the database
    const result = await db.query("SELECT * FROM offices");

    // Return the projects
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not get projects" });
  }
});

//getAllIndustryList
router.get("/allIndustriesList", async (req, res) => {
  try {
    // Get all projects from the database
    const result = await db.query("SELECT * FROM industries");
    console.log("the result of the all industries api is::", result);

    // Return the projects
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not get projects" });
  }
});
//getAllTeamsList
router.get("/allTeamsList", async (req, res) => {
  try {
    // Get all projects from the database
    const result = await db.query("SELECT * FROM teams");

    // Return the projects
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not get projects" });
  }
});
//getAllTeamsList
router.get("/allLeadPracticeGroupList", async (req, res) => {
  try {
    // Get all projects from the database
    const result = await db.query("SELECT * FROM leadpracticegroup");

    // Return the projects
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not get projects" });
  }
});
const generateThumbnail = async (projectName, projectFilePath) => {
  // console.log("The config.scriptFilePath is:", config.scriptFilePath);
  // console.log("The projectFilePath:", projectFilePath);
  try {
    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
      <soapenv:Body>
          <soap:RunScript>
              <runScriptParameters>
                  <scriptLanguage>javascript</scriptLanguage>
                  <scriptFile>${config.scriptFilePath}/ExportThumbails.jsx</scriptFile>
                  <scriptArgs>
                      <name>arg1</name>
                      <value>${projectFilePath}</value>
                  </scriptArgs>
              </runScriptParameters>
          </soap:RunScript> 
      </soapenv:Body>
  </soapenv:Envelope>`;

    let res = await axios
      .post("http://localhost:1234", xmls, {
        headers: { "Content-Type": "text/xml" },
      })
      .then((response) => {
        // console.log("response genertate thumbnials ::", response);
        xml2js.parseString(response.data, (err, result) => {
          if (err) {
            console.error("Error parsing XML:", err);
            res.status(500).json({ message: "Error parsing XML" });
          } else {
            // console.log("Project created:");
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        throw new Error("Error processing file: " + error.message);
      });
    // console.log("res is::", res);
    return { data: "File Processed!" };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error processing file: " + error.message);
  }
};

//getAllofficesList
router.get("/allofficesList", async (req, res) => {
  try {
    // Get all projects from the database
    const result = await db.query("SELECT * FROM offices");
    // console.log("the result of the all office api is::", result);

    // Return the projects
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not get projects" });
  }
});

// getAllProjectsList
router.get("/allProjectsList", async (req, res) => {
  try {
    // Get all projects from the database
    const result = await db.query("SELECT * FROM newprojects");

    // Map over the projects and add the file name and image to each project
    const projects = result.rows.map((project) => {
      // Construct the directory path for the project in the public folder
      const projectDir = path.join(
        __dirname,
        "..",
        "public",
        "projects",
        project.project_name
      );

      let fileName = "";
      let image = "";
      // Check if the directory exists before reading it
      if (fs.existsSync(projectDir)) {
        // Read the directory and get the first file name
        const files = fs.readdirSync(projectDir);
        fileName = files.find((file) => path.extname(file) === ".indt");
        const imageFile = files.find((file) =>
          [".jpeg", ".jpg", ".png"].includes(path.extname(file))
        );
        const pdfFile = files.find((file) => path.extname(file) === ".pdf");
        if (imageFile) {
          image = `http://localhost:4000/public/projects/${project.project_name}/${imageFile}`;
        }
        // if (pdfFile) {
        //   pdf = `http://localhost:4000/public/projects/${project.project_name}/${pdfFile}`;
        // }
      }

      // Add the file name and image to the project
      return { ...project, fileName, image };
    });

    // Return the projects
    res.status(200).json({
      status: 200,
      data: projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not get projects" });
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
      // console.log("the response of hte matadata:::", response);

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
router.get("/html", (req, res) => {
  const fileNameTemaplate = req.query.fileNameTemaplate;
  const html = fs.readFileSync(
    path.join(__dirname, `../public/output/${fileNameTemaplate}/output.html`),
    "utf8"
  );

  const mapping = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        `../public/output/${fileNameTemaplate}/mapping.json`
      ),
      "utf8"
    )
  ).map((m) => {
    // Remove unwanted characters and escape sequences from the content
    m.content = m.content.replace(/[^\x20-\x7E]|[\r\n]/g, "");
    return m;
  });

  // Parse the HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Get all div elements
  const divElements = document.getElementsByTagName("div");

  // Iterate over the div elements
  for (let div of divElements) {
    // Get all p elements within the current div
    const pElements = div.getElementsByTagName("p");

    // Initialize an empty string to hold the concatenated text
    let concatenatedText = "";

    // Concatenate the text content of the p tags
    for (let p of pElements) {
      concatenatedText += p.textContent.trim();
    }

    // Find the corresponding mapping object
    const mappingObject = mapping.find(
      (m) =>
        m.content.replace(/[\r\n\t]/g, "").trim() ===
        concatenatedText.replace(/[\r\n\t]/g, "").trim()
    );

    // If a matching mapping object is found
    if (mappingObject) {
      // Assign the data_id to the div
      // div.setAttribute("data_id", mappingObject.id);
      for (let p of pElements) {
        p.setAttribute("data_id", mappingObject.id);
      }
      // Log the matched div content and mapping content
      console.log(`Matched div content: ${concatenatedText.trim()}`);
      // console.log(`Matched mapping content: ${mappingObject.content.trim()}`);
    } else {
      // If no match is found, log the unmatched div content
      console.log(`Unmatched div content: ${concatenatedText.trim()}`);
      // console.log(
      //   `Unmatched mapping content: ${mapping
      //     .map((m) => m.content.replace(/\r/g, "").trim())
      //     .join(", ")}`
      // );
    }
  }

  // Serialize the updated HTML
  const updatedHtml = dom.serialize();

  res.send({ html: updatedHtml, mapping });
});

router.post("/update", async (req, res) => {
  const modifications = req.body.modifications;
  const fileName = req.body?.fileName;
  const outputPath = req.body?.outputPath;
  const indesignName = req.body?.indesignName;
  console.log("The request body is::", req.body);
  console.log("The request body is::", fileName);
  // Create an array of modifications in the SOAP request format
  const soapModifications = modifications.map((modification) => {
    return `
      <item>
        <data_id>${modification.data_id}</data_id>
        <value>${modification.newText}</value>
     
      </item>
    `;
  });
  console.log("The soup modifications is::", soapModifications);
  // Combine all modifications into a single SOAP argument
  const soapArguments = `
    <scriptArgs>
      <name>allArguments</name>
      <value>
        <dataArray>
          ${soapModifications.join("")}
        </dataArray>
        
      </value>
    </scriptArgs>
    <scriptArgs>
                 <name>fileName</name>
                    <value>${fileName}</value>
                </scriptArgs>
                <scriptArgs>
                 <name>outputPath</name>
                    <value>${outputPath}\</value>
                </scriptArgs>
                <scriptArgs>
                 <name>indesignName</name>
                    <value>${indesignName}\</value>
                </scriptArgs>
    
  `;

  // Construct the SOAP request
  const soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
      <soapenv:Body>
        <soap:RunScript>
          <runScriptParameters>
            <scriptLanguage>javascript</scriptLanguage>
            <scriptFile>${config.scriptFilePath}/UpdateAndExport.jsx</scriptFile>
            ${soapArguments}
          </runScriptParameters>
        </soap:RunScript>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  console.log("This is the modified SOAP request update:", soapRequest);
  try {
    const response = await axios.post("http://localhost:1234", soapRequest, {
      headers: { "Content-Type": "text/xml" },
    });

    // Parse the XML response
    xml2js.parseString(response.data, async (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return res
          .status(500)
          .json({ status: 500, message: "Error parsing XML" });
      } else {
        // res.json({
        //   status: 200,
        //   message: "Text frames updated and document exported successfully",

        // });

        const result = await generateThumbnail(fileName, outputPath);
        console.log("The res is::", result);
        if (result.data.toLowerCase() === "file processed!") {
          res.json({
            status: 200,
            message: "Text frames updated and document exported successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 500,
      message: "Error updating text frames and exporting document",
      error,
    });
  }
});

//genratepdf
router.post("/generatePdfs", async (req, res) => {
  try {
    const { arg1 } = req.body;
    console.log("genereatepdf ::", req.body);
    const pdfPath = path.join(
      "D:/Office/SigmaSquare/renser-dev/rensera/server/generatedHtml/Pdfs",
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
      // res.on("finish", () => {
      //   fs.unlink(pdfPath, (err) => {
      //     if (err) console.error("Error deleting file:", err);
      //   });
      // });
    } else {
      res.status(404).json({ message: "PDF not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error generating PDF", error });
  }
});

//creating thumbnails of files
router.post("/creatingThumbnails", async (req, res) => {
  // console.log("API of creating thumbnail is calling....");
  // console.log("The REQUEST FILE RESPONSE IS::", req.file);

  // Call InDesign script after file upload
  const runScriptXml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
    <soapenv:Body>
        <soap:RunScript>
            <runScriptParameters>
                <scriptLanguage>javascript</scriptLanguage>
                <scriptFile>${config.scriptFilePath}/ExportThumbails.jsx</scriptFile>
                <scriptArgs>
                    <name>arg1</name>
                    <value>arg1</value>
                </scriptArgs>
            </runScriptParameters>
        </soap:RunScript>
    </soapenv:Body>
</soapenv:Envelope>`;

  try {
    // Call the InDesign server
    const response = await axios.post("http://localhost:1234", runScriptXml, {
      headers: { "Content-Type": "text/xml" },
    });

    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        res.status(500).json({ message: "Error parsing XML" });
      } else {
        // console.log("The RESULT of the thumbnial api is:::", result);

        // Extract the scriptResult data
        const scriptResultData =
          result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
            "IDSP:RunScriptResponse"
          ][0]["scriptResult"][0]["data"][0].item[0].data[0]["_"];
        // console.log(
        //   "The Script result is::",
        //   result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
        //     "IDSP:RunScriptResponse"
        //   ][0]["scriptResult"][0]["data"][0].item[0].data[0]["_"]
        // );
        let scriptResult;

        try {
          scriptResult = JSON.parse(scriptResultData);
        } catch (error) {
          scriptResult = scriptResultData;
        }
        // console.log("The Final list is....", scriptResult);

        res.status(200).json({
          status: 200,
          message: "File uploaded successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error uploading file to InDesign server",
      error: error,
    });
  }
});

router.post("/convertHtml", async (req, res) => {
  const { name, fileName } = req.body;
  // console.log("the request is...", req);

  const folderPath = `${config.uploadPath}/public/output`;

  try {
    // Remove the folder and its contents
    await fse.remove(folderPath);
    console.log("Folder is removed!");
  } catch (error) {
    console.error("Error removing folder:", error);
  }

  const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
    <soapenv:Body>
        <soap:RunScript>
            <runScriptParameters>
                <scriptLanguage>javascript</scriptLanguage>
                <scriptFile>${config.scriptFilePath}/convertToHtml.jsx</scriptFile>
                <scriptArgs>
                    <name>arg1</name>
                    <value>${name}</value>
                </scriptArgs>
                <scriptArgs>
                    <name>fileName</name>
                    <value>${fileName}</value>
                </scriptArgs>
            </runScriptParameters>
        </soap:RunScript>
    </soapenv:Body>
</soapenv:Envelope>`;

  // console.log("ConverToHTML::", xmls);
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
        // console.log(
        //   "The result is ::",
        //   result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
        //     "IDSP:RunScriptResponse"
        //   ][0]["scriptResult"][0]["data"][0]["_"]
        // );
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
    res.status(500).json({
      message: "Error uploading file to InDesign server",
      error: error,
    });
  }
});

//Upload Template Api
router.post("/uploadFile", upload.single("file"), async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).send({ message: req.fileValidationError });
  }

  const { template } = req.query;
  const filePath = req.file.path;
  const query =
    "INSERT INTO templates(template_name, filePath, created_at) VALUES($1, $2, NOW()) RETURNING *";
  const values = [template, filePath];

  try {
    const result = await db.query(query, values);
    // console.log("inserted into db", result.rows);
    // var filePath=fileName.replace(/[^\\\/]+$/, '');
    let resultOfThumbnails = await generateThumbnail(
      template,
      result.rows[0].filepath
    );
    // console.log("The genrate REsponse is:", resultOfThumbnails?.data);
    // console.log("The genrate REsponse is:", resultOfThumbnails);
    if (resultOfThumbnails.data) {
      res.status(201).json({
        status: 201,
        message: "File uploaded successfully",
        data: result.rows[0],
      });
    }
  } catch (error) {
    console.error("Error executing query", error.stack);
    if (error.constraint === "template_name_unique") {
      return res.status(400).json({ error: "Template name already exists" });
    }
    return res
      .status(500)
      .json({ error: "An error occurred while updating the database" });
  }
});

router.post("/updateHome", async (req, res) => {
  const modifications = req.body.modifications;
  const fileName = req.body?.fileName;
  const outputPath = req.body?.outputPath;
  const indesignName = req.body?.indesignName;
  // console.log("The request body is::", req.body);
  // console.log("The request body is::", fileName);
  // Create an array of modifications in the SOAP request format
  const soapModifications = modifications.map((modification) => {
    return `
      <item>
        <data_id>${modification.data_id}</data_id>
        <value>${modification.newText}</value>
     
      </item>
    `;
  });
  // console.log("The soup modifications is::", soapModifications);
  // Combine all modifications into a single SOAP argument
  const soapArguments = `
    <scriptArgs>
      <name>allArguments</name>
      <value>
        <dataArray>
          ${soapModifications.join("")}
        </dataArray>
        
      </value>
    </scriptArgs>
    <scriptArgs>
                 <name>fileName</name>
                    <value>${fileName}</value>
                </scriptArgs>
                <scriptArgs>
                 <name>outputPath</name>
                    <value>${outputPath}\</value>
                </scriptArgs>
                <scriptArgs>
                 <name>indesignName</name>
                    <value>${indesignName}\</value>
                </scriptArgs>
    
  `;

  // Construct the SOAP request
  const soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://ns.adobe.com/InDesign/soap/">
      <soapenv:Body>
        <soap:RunScript>
          <runScriptParameters>
            <scriptLanguage>javascript</scriptLanguage>
            <scriptFile>${config.scriptFilePath}/UpdateAndExport2.jsx</scriptFile>
            ${soapArguments}
          </runScriptParameters>
        </soap:RunScript>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  // console.log("This is the modified SOAP request:", soapRequest);
  try {
    const response = await axios.post("http://localhost:1234", soapRequest, {
      headers: { "Content-Type": "text/xml" },
    });

    // Parse the XML response
    xml2js.parseString(response.data, async (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return res
          .status(500)
          .json({ status: 500, message: "Error parsing XML" });
      } else {
        // res.json({
        //   status: 200,
        //   message: "Text frames updated and document exported successfully",

        // });

        const result = await generateThumbnail(fileName, outputPath);
        // console.log("The res is of update thumbnail api is::", result);
        if (result.data.toLowerCase() === "file processed!") {
          res.json({
            status: 200,
            message: "Text frames updated and document exported successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 500,
      message: "Error updating text frames and exporting document",
      error,
    });
  }
});

router.get("/download/:pdfName", function (req, res) {
  const file = path.resolve(
    __dirname,
    `../public/projects/${req.params.pdfName}/${req.params.pdfName}.pdf`
  );
  res.download(file); // Set disposition and send it.
});
module.exports = router;
