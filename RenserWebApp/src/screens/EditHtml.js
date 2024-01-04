import React, { useRef, useEffect, useState } from "react";
import "../assets/css/style.css";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { generatePdf } from "../services/api";
let modification = [];

const EditHtml = () => {
  const location = useLocation()
  const stateData = location?.state;
  console.log("THe file name is...", stateData?.fileNameTemaplate)

  const apiUrlOfServer = process.env.REACT_APP_API_URL;
  const iframeRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  // const [html, setHtml] = useState("");
  const [mapping, setMapping] = useState({});
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default color is black

  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
  };
  useEffect(() => {
    // Load the HTML and the mapping from the server
    fetch(`http://3.132.112.94:4000/api/html?fileNameTemaplate=${stateData?.fileNameTemaplate}`)
      .then((response) => response.json())
      .then(({ html: content, mapping }) => {
        console.log("Fetched HTML content:", content);

        const absoluteContent = content
          .replace(/href="\//g, 'href="http://3.132.112.94:4000/')
          .replace(/src="\//g, 'src="http://3.132.112.94:4000/')
          .replace(
            /href="output-web-resources\//g,
            `href="http://3.132.112.94:4000/public/output/${stateData?.fileNameTemaplate}/output-web-resources/`
          )
          .replace(
            /src="output-web-resources\//g,
            `src="http://3.132.112.94:4000/public/output/${stateData?.fileNameTemaplate}/output-web-resources/`
          );


        setHtmlContent(absoluteContent);
        setMapping(mapping);
      })
      .catch((error) => console.error("Error fetching HTML file:", error));
  }, []);

  const handleElementClick = (event) => {
    const iframe = iframeRef.current.contentDocument;
    console.log("IFrame:", iframe);
    if (!iframe) {
      console.error("Iframe contentDocument is null");
      return;
    }

    console.log("IFrame:", iframe);

    const paragraphs = iframe.querySelectorAll("p");

    const link = iframe.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "/App.css";
    iframe.head.appendChild(link);

    paragraphs.forEach((paragraph) => {
      paragraph.addEventListener("click", (e) => {
        // Get the class name of the clicked paragraph
        const className = paragraph.className;
        console.log("Class name of clicked paragraph: ", className);
        console.log("The modifed text is::", paragraph.innerText);

        // Access the parent <div> element
        const parentDiv = paragraph.parentNode;

        // Make the parent <div> content editable and add a border
        parentDiv.contentEditable = true;
        parentDiv.style.border = "50px dotted  black"; // Adjust the border as needed

        parentDiv.addEventListener("blur", () => {
          parentDiv.contentEditable = false;
          parentDiv.style.border = "";
          console.log("The modifed text is::", paragraph.innerText);
        });

        parentDiv.focus();
      });
    });
  };

  const handleContentEditableClick = async (event) => {
    // Add logic here to handle the click on the contentEditable element
    const container = document.getElementById("he"); // Replace 'yourContainerId' with the actual ID of your container

    const paragraphs = container.querySelectorAll("p");

    paragraphs.forEach((paragraph) => {
      paragraph.addEventListener("click", async () => {
        // Get the class name, id, and initial text of the clicked paragraph
        const className = paragraph.className;
        const id = paragraph.id;
        const initialText = paragraph.innerText;
setSelectedText(initialText)
        // Access the parent <div> element
        const parentDiv = paragraph.parentNode;

        // Make the parent <div> content editable and add a border
        parentDiv.contentEditable = true;
        setIsToolbarVisible(true)

        parentDiv.style.border = '30px dotted black';
        parentDiv.style.borderRadius = '100px';
        parentDiv.style.cursor = 'pointer';
        parentDiv.style.caretColor = 'black';
        parentDiv.style.color='red'

        // Set up an event listener for when the user finishes editing
        parentDiv.addEventListener("blur", handleBlur);

        parentDiv.focus();
      });
    });
  };
  const handleBlur = (event) => {
    // setIsToolbarVisible(false)
    const parentDiv = event.currentTarget;
    const paragraph = parentDiv.querySelector("p");

    // Extract data_id from the p tag's data_id attribute
    const dataId = paragraph.getAttribute("data_id");
    console.log("dataId", dataId);
    const modifiedText = paragraph.innerText;
    console.log("Hello modifications:",modifiedText)

    // Save the modified text and data_id to the array as a JSON object
    modification.push({
      data_id: dataId,
      newText: modifiedText,
    });

    console.log("Modified Text:", modifiedText);
    console.log("The modified array  is:", modification);

    // Disable content editing and remove the border
    parentDiv.contentEditable = false;
    parentDiv.style.border = "";
  };
  const handleSaveClick = async (modifiedText) => {
    try {
      console.log("The modified all text is:", modification);

      // Send the modifications array to the server
      const response = await axios.post("http://3.132.112.94:4000/api/update", {
        modifications: modification,
        fileName: stateData.fileName
      });

      console.log("Server response:", response.data);
      if (response.data) {
        // const result = await generatePdf()
        // console.log("Result is ::", result)
      }
      // Handle the response as needed
    } catch (error) {
      console.error("Error saving modifications:", error);

      // Handle errors
    }
  };

  return (
    <div >
      {
        isToolbarVisible && (
          <div style={{ position: 'absolute', right: '5', top: '5rem', zIndex: '1000',width:'30%' }} className="toolbar">
            <b>Original Text</b>
            <p style={{}}>{selectedText}</p>
            <div style={{ margin: 0, padding: 0, borderTop: '1px solid #eee',width:'100%'}}className="row-section">
              <b>Size</b>
              <b style={{ marginLeft: '4.1rem', padding: 0 }}>Font</b>
            </div>
            <div style={{ margin: 0, padding: 0 }} className="row-section">
              <select style={{ marginRight: 10 }}>
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
              </select>

              <select>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Times New Roman, serif">Times New Roman</option>
                <option value="Verdana, sans-serif">Verdana</option>
              </select>
            </div>

            <div style={{ margin: 0 }} className="row-section">

              <button style={{ margin: 5 }}>B</button>
              <button style={{ margin: 5 }}>I</button>
              <button style={{ margin: 5 }}>U</button>

              <label style={{ display: 'flex', alignItems: 'center', margin: 5 }}>
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            style={{ marginLeft: '5px', border: 'none', cursor: 'pointer' }}
          />
        </label>
            </div>
            <b>Options</b>
            <div className="row-section">
              <button style={{ margin: 5 }}><i className="fas fa-align-left"></i></button>
              <button style={{ margin: 5 }}><i className="fas fa-align-center"></i></button>
              <button style={{ margin: 5 }}><i className="fas fa-align-right"></i></button>
            </div>
            <div style={{marginLeft:'auto' }}>
        <button
          onClick={handleSaveClick}
          className="inner-section"
          type="button"

        >
          Apply
        </button>
      </div>
          </div>
        )
      }

      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          width: "50vh",

        }}
        id="he"
        className="file-upload-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onClick={handleContentEditableClick}
      ></div>


    </div>
  );
};
export default EditHtml;