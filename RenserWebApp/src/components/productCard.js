import React from "react";
import starIconImg from "../assets/images/star-icon.png";
import cloneIconImg from "../assets/images/clone-icon.png";
import settingIconImg from "../assets/images/settings-icon.png";
import trashIconImg from "../assets/images/trash-can-icon.png";
import { Link } from "react-router-dom";
import homeImg from "../assets/images/home-img-01.d60eb4b9.png";
import thumbnailPreviewImg from "../assets/images/thumbnail-preview-overlay.png";

const ProductCard = ({
  item,
  previewHandler,
  deleteHandler,
  projectEditHandler,
  settingHandler,
  changeStatusHandler,
}) => {
  return (
    <div className="col-xl-3 col-sm-12 col-lg-6 col-md-12 col-xs-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <Link
              className="upload-btn"
              to={{
                pathname: "/layoutedit",
                templatesProps: {
                  projectName: `${item.projectName}`,
                  layoutName: `${item.productLayoutName}`,
                  projectId: `${item.projectId}`,
                },
              }}
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
              }}
            >
              {item.projectName}
            </Link>
          </h5>
          <div className="latest-update">Created Date: {item.created}</div>
          <div className="latest-update">Last Updated: {item.modified}</div>
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
                <img
                  className="thumb"
                  src={
                    "https://rensera.live/renseraapi/assets/thumb/" +
                    "" +
                    item.productImage
                  }
                  alt=""
                  width="129"
                />
              ) : (
                <img className="thumb" src={homeImg} alt="" width="129" />
              )}
              <a className="thumbPreview" href="javascript:void(0)">
                <img
                  src={thumbnailPreviewImg}
                  alt=""
                  onClick={previewHandler}
                />
              </a>
            </div>

            <div className="right-part">
              <ul>
                <li>Team: {item.teamName}</li>
                <li>
                  Creator: {item.creatorFname} {item.creatorLname}
                </li>
                <li>Template: {item.templateName}</li>
                <li>Version: {item.version}</li>
              </ul>
              <div className="button-section">
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    if (window.confirm("Are you sure to delete this record?")) {
                      deleteHandler(item.projectId);
                    }
                  }}
                  title="delete"
                >
                  <img src={trashIconImg} className="action-icon" />
                </a>
                <a
                  href="javascript:void(0)"
                  title="copy"
                  onClick={() => {
                    projectEditHandler(item.projectId, "copy");
                  }}
                  /* onClick={() => {if(window.confirm('Are you sure to copy this project?')){ copyHandler(item.projectId)};}} */ title="create-new-project"
                >
                  <img src={cloneIconImg} className="action-icon" />
                </a>

                <a
                  className="setting"
                  href="javascript:void(0)"
                  title="setting"
                  onClick={
                    settingHandler
                  } /* onClick={e => setState({settingBox:item.projectId})} */
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
                        onClick={() => {
                          changeStatusHandler(item.projectId, "1");
                        }}
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
                        onClick={() => {
                          changeStatusHandler(item.projectId, "2");
                        }}
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
                        onClick={() => {
                          changeStatusHandler(item.projectId, "3");
                        }}
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
                        onClick={() => {
                          changeStatusHandler(item.projectId, "4");
                        }}
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
                        onClick={() => {
                          changeStatusHandler(item.projectId, "5");
                        }}
                      >
                        Archived
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          projectEditHandler(item.projectId, "edit");
                        }}
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
