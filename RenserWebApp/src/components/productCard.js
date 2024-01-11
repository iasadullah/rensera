import React, { useState } from "react";
import starIconImg from "../assets/images/star-icon.png";
import cloneIconImg from "../assets/images/clone-icon.png";
import settingIconImg from "../assets/images/settings-icon.png";
import trashIconImg from "../assets/images/trash-can-icon.png";
import { Link } from "react-router-dom";
import homeImg from "../assets/images/home-img-01.d60eb4b9.png";
import thumbnailPreviewImg from "../assets/images/thumbnail-preview-overlay.png";
import { convertHtmlApi } from "../services/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "./Loading";
import axios from "axios";
const ProductCard = ({
  item,
  previewHandler,
  deleteHandler,
  projectEditHandler,
  settingHandler,
  changeStatusHandler,
  projectData,
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // const [image,created_at, name, creator_first_name,creator_last_name] = projectData;
  // console.log("The image Tamplate is::",projectData)
  const handleClick = async (project_name, file_name) => {
    setLoading(true);
    console.log("pojectName ::", project_name, file_name);
    let res = await convertHtmlApi(file_name, project_name);
    console.log("Convert to html:", res);
    setLoading(false);

    history.push("/edit-html", {
      fileName: file_name,
      fileNameTemaplate: project_name,
    });
  };

  const handleDownloadPdf = async (pdfName) => {
    console.log("the exect of pdfPath pdf is::", pdfName);
    try {
      const response = await axios({
        url: `http://localhost:4000/api/download/${pdfName}`,
        method: "GET",
        responseType: "blob", // Important
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${pdfName}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading PDF", error);
    }
  };
  return (
    <div className="col-xl-3 col-sm-12 col-lg-6 col-md-12 col-xs-12">
      {loading && <Loading />}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <div
              className="upload-btn"
              onClick={() => handleClick(item.project_name, item.filepath)}
              style={{
                color: `${
                  item.projectStatus == 1
                    ? "rgba(0, 0, 0, 0.75)"
                    : item.projectStatus == 2
                    ? "red"
                    : item.projectStatus == 3
                    ? "rgba(0, 0, 0, 0.54)"
                    : item.projectStatus == 4
                    ? "green"
                    : item.projectStatus == 5
                    ? "rgba(0, 0, 0, 0.54)"
                    : ""
                }`,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {item?.project_name}
            </div>
          </h5>
          <div className="latest-update">
            Created Date: {item?.created_at.substring(0, 10)}
          </div>
          {/* <div className="latest-update">Last Updated: {item.modified}</div> */}
          <div className="status">
            Status:{" "}
            {`${
              item.projectStatus == 1
                ? "Active"
                : item.projectStatus == 2
                ? "Active - Locked"
                : item.projectStatus == 3
                ? "Sent for Review"
                : item.projectStatus == 4
                ? "Approved"
                : item.projectStatus == 5
                ? "Archived"
                : "Active"
            }`}
          </div>
          <div className="img-box-text">
            <div className="thumbnail">
              {item.productImage != null ? (
                <img className="thumb" src="" alt="" width="129" />
              ) : (
                <img className="thumb" src={item?.image} alt="" width="129" />
              )}
              <a className="thumbPreview" href="javascript:void(0)">
                <img
                  src={thumbnailPreviewImg}
                  alt=""
                  onClick={() => previewHandler(item?.image)}
                />
              </a>
            </div>

            <div className="right-part">
              <ul>
                <li>Team: {item.team}</li>
                <li>
                  Creator: {item?.creator_first_name} {item?.creator_last_name}
                </li>
                <li>Template: {item?.project_name}</li>
                {/* <li>Description: {description}</li> */}
                <li>Version: V:1.0.1</li>
              </ul>
              <div className="button-section">
                <a
                  href="javascript:void(0)"
                  // onClick={() => {
                  //   if (window.confirm("Are you sure to delete this record?")) {
                  //     deleteHandler(item.projectId);
                  //   }
                  // }}
                  title="delete"
                >
                  <img src={trashIconImg} className="action-icon" />
                </a>
                <a
                  href="javascript:void(0)"
                  title="download pdf"
                  // onClick={() => {
                  //   projectEditHandler(item.projectId, "copy");
                  // }}
                  // /* onClick={() => {if(window.confirm('Are you sure to copy this project?')){ copyHandler(item.projectId)};}} */ title="create-new-project"
                  onClick={() => handleDownloadPdf(item.project_name)}
                >
                  <img src={cloneIconImg} className="action-icon" />
                </a>

                <a
                  className="setting"
                  href="javascript:void(0)"
                  title="setting"
                  // onClick={
                  //   settingHandler
                  // }
                  /* onClick={e => setState({settingBox:item.projectId})} */
                >
                  <img src={settingIconImg} className="action-icon" />
                </a>

                <div
                  className="box-show" /* style={{display : `${item.projectId == state.settingBox ? "block" : "none"}`}} */
                >
                  <ul>
                    <li>
                      <a
                        href="javascript:void(0)"
                        className={`${
                          item.projectStatus == "1" ? "active" : ""
                        }`}
                        // onClick={() => {
                        //   changeStatusHandler(item.projectId, "1");
                        // }}
                      >
                        Active
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        className={`${
                          item.projectStatus == "2" ? "active" : ""
                        }`}
                        // onClick={() => {
                        //   changeStatusHandler(item.projectId, "2");
                        // }}
                      >
                        {" "}
                        Active - Locked
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        className={`${
                          item.projectStatus == "3" ? "active" : ""
                        }`}
                        // onClick={() => {
                        //   changeStatusHandler(item.projectId, "3");
                        // }}
                      >
                        {" "}
                        Sent for Review
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        className={`${
                          item.projectStatus == "4" ? "active" : ""
                        }`}
                        // onClick={() => {
                        //   changeStatusHandler(item.projectId, "4");
                        // }}
                      >
                        Approved
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        className={`${
                          item.projectStatus == "5" ? "active" : ""
                        }`}
                        // onClick={() => {
                        //   changeStatusHandler(item.projectId, "5");
                        // }}
                      >
                        Archived
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        // onClick={() => {
                        //   projectEditHandler(item.projectId, "edit");
                        // }}
                      >
                        Edit Details
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {item.projectStatus == 1 ? (
              <div className="star-icon">
                <img src={starIconImg} />
              </div>
            ) : (
              <div className="star-icon"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
