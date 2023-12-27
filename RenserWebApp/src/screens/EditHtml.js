import React, { useState, useEffect } from "react";
import axios from "axios";

const EditHtml = () => {
  const [html, setHtml] = useState("");
  const [mapping, setMapping] = useState({});

  useEffect(() => {
    // Load the HTML and the mapping from the server
    fetch("http://localhost:4000/api/html")
      .then((response) => response.json())
      .then(({ html: content, mapping }) => {
        console.log("Fetched HTML content:", content);

        const absoluteContent = content
          .replace(/href="\//g, 'href="http://localhost:4000/')
          .replace(/src="\//g, 'src="http://localhost:4000/')
          .replace(
            /href="output-web-resources\//g,
            'href="http://localhost:4000/output-web-resources/'
          )
          .replace(
            /src="output-web-resources\//g,
            'src="http://localhost:4000/output-web-resources/'
          );

        setHtml(absoluteContent);
        setMapping(mapping);
      })
      .catch((error) => console.error("Error fetching HTML file:", error));
  }, []);

  const handleBlur = (event) => {
    // Find the closest parent or self with a data-id attribute
    const parentDiv = event.currentTarget;
    const paragraph = parentDiv.querySelector("p[data-id]");
    if (paragraph) {
      const modifiedText = paragraph.innerText;
      const dataId = paragraph.getAttribute("data-id");
      console.warn("paragraph classname", paragraph);

      // Send the updated text and data-id to the server
      axios.post("http://localhost:4000/api/update", {
        dataId,
        text: modifiedText,
      });
    }
  };

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      contentEditable
      onBlur={handleBlur}
    />
  );
};
export default EditHtml;
