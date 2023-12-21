import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadFileScreen = () => {
  const [htmlContent, setHtmlContent] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const props = {
    action: "http://localhost:4000/api/workouts/uploadFile",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);

        fetch("http://localhost:4000/generatedHtml/output.html")
          .then((response) => response.text())
          .then((content) => {
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

            setHtmlContent(absoluteContent);
            setIsFileUploaded(true);
          })
          .catch((error) => console.error("Error fetching HTML file:", error));
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="file-upload-container">
      {!isFileUploaded ? (
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      ) : (
        htmlContent && (
          <div
            className="file-upload-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )
      )}
    </div>
  );
};

export default UploadFileScreen;
