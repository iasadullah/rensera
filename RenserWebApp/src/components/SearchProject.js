import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import homeImg from "../assets/images/home-img-01.d60eb4b9.png";
import starIconImg from "../assets/images/star-icon.png";
import cloneIconImg from "../assets/images/clone-icon.png";
import editPencilIconImg from "../assets/images/edit-details-pencil-icon.png";
import settingIconImg from "../assets/images/settings-icon.png";
import trashIconImg from "../assets/images/trash-can-icon.png";
import cover1Img from "../assets/images/thumbnail1.png";
import cover2Img from "../assets/images/thumbnail2.png";
import cover3Img from "../assets/images/thumbnail3.png";
import cover4Img from "../assets/images/thumbnail4.png";
import cover5Img from "../assets/images/thumbnail5.png";
import cover6Img from "../assets/images/thumbnail6.png";
import cover7Img from "../assets/images/thumbnail7.png";
import cover8Img from "../assets/images/thumbnail8.png";
import cover9Img from "../assets/images/thumbnail9.png";
import cover10Img from "../assets/images/thumbnail10.png";
import cover11Img from "../assets/images/thumbnail11.png";
import cover12Img from "../assets/images/thumbnail12.png";
import {
  onUnapproveProject,
  fetchProjectDataById,
  onSearchProjectData,
  fetchAllOffices,
  fetchAllLeadPracticeGroups,
  fetchAllTemplate,
  fetchAllProject,
  ondeleteProject,
  onCopyProject,
  onApproveProject,
} from "../services/api";
import dateFormat from "dateformat";
import axios from "axios";
import config from "../includes/config";
import $ from "jquery";
import "../assets/js/bootstrap.min.js";

const SearchProject = () => {
  const [state, setState] = useState({
    projectPopupType: "Create",
    projectId: "",
    projectName: "",
    leadLawyerFname: "",
    leadLawyerLname: "",
    officeId: "",
    leadPracticeGroupId: "",
    selectedTemplateId: "",
    description: "",
    show: false,
    stepshow: false,
    settingBox: "",
    projectSearch: "",
    offices: [],
    leadPracticeGroups: [],
    templates: [],
    projects: [],
  });

  useEffect(() => {
    getAllProject();
    getAllOffices();
    getAllLeadPracticeGroups();
  }, []);

  const handleClose = () => {
    setState({
      ...state,
      show: false,
      stepshow: false,
      projectPopupType: "Create",
      projectId: "",
      projectName: "",
      leadLawyerFname: "",
      leadLawyerLname: "",
      officeId: "",
      leadPracticeGroupId: "",
      selectedTemplateId: "",
      description: "",
    });
  };

  const handleShow = () => {
    //getAllOffices();
    //getAllLeadPracticeGroups();
    getAllTemplate();
    setState({ ...state, show: true, stepshow: false });
  };

  const step2handleClose = () => {
    setState({
      ...state,
      show: false,
      stepshow: false,
      projectPopupType: "Create",
      projectId: "",
      projectName: "",
      leadLawyerFname: "",
      leadLawyerLname: "",
      officeId: "",
      leadPracticeGroupId: "",
      selectedTemplateId: "",
      description: "",
    });
  };

  const stephandleShow = () => {
    setState({ ...state, show: false, stepshow: true });
  };

  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setState({ ...state, [nam]: val });

    console.log(state);
  };

  const searchChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setState({ ...state, [nam]: val });
    searchProjectHandler("Search", val);
  };

  const mySubmitHandler = (event) => {
    // event.preventDefault();
    const self = this;
    let formData = new FormData();
    formData.append("projectName", state.projectName);
    formData.append("leadLawyerFname", state.leadLawyerFname);
    formData.append("leadLawyerLname", state.leadLawyerLname);
    formData.append("officeId", state.officeId);
    formData.append("leadPracticeGroupId", state.leadPracticeGroupId);
    formData.append("templateId", state.selectedTemplateId);
    formData.append("description", state.description);
    formData.append("projectId", state.projectId);

    axios({
      method: "post",
      url: config.API_URL + "saveProject",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        //handle success

        if (response.data.success == "1") {
          setState({
            ...state,
            projectPopupType: "Create",
            projectId: "",
            projectName: "",
            leadLawyerFname: "",
            leadLawyerLname: "",
            officeId: "",
            leadPracticeGroupId: "",
            selectedTemplateId: "",
            description: "",
          });
          handleClose();
          step2handleClose();
          getAllProject();
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const getAllOffices = async () => {
    try {
      const result = await fetchAllOffices();
      setState({
        ...state,
        offices: result,
      });
    } catch (err) {}
  };

  const getAllLeadPracticeGroups = async () => {
    try {
      const result = await fetchAllLeadPracticeGroups();
      setState({
        ...state,
        leadPracticeGroups: result,
      });
    } catch (err) {}
  };

  const getAllTemplate = async () => {
    try {
      const result = await fetchAllTemplate();
      setState({
        ...state,
        templates: result,
      });
    } catch (err) {}
  };

  const getAllProject = async () => {
    try {
      const result = await fetchAllProject();
      setState({
        ...state,
        projects: result,
      });
    } catch (err) {}
  };

  const deleteHandler = async (projectId) => {
    try {
      await ondeleteProject(projectId);
      getAllProject();
      console.log("Deleted Successfully.");
    } catch (err) {}
  };

  const copyHandler = async (projectId) => {
    try {
      const result = await onCopyProject(projectId);
      getAllProject();
      console.log("Copied Successfully.");
    } catch (err) {}
  };

  const approveHandler = async (projectId) => {
    try {
      $(".box-show").hide();
      const result = await onApproveProject(projectId);
      getAllProject();
      console.log("Approved Successfully.");
    } catch (err) {}
  };

  const unapproveHandler = async (projectId) => {
    try {
      $(".box-show").hide();
      await onUnapproveProject(projectId);
      getAllProject();
      console.log("Unapproved Successfully.");
    } catch (err) {}
  };

  const settingHandler = (e) => {
    $(e.target).parent().parent().find(".box-show").toggle();
  };

  const searchHandler = (e) => {
    $("#sidebar-wrapper").toggle();
    $("#page-content-wrapper .row").children().toggleClass("col-xl-4");
  };

  const projectEditHandler = async (projectId) => {
    try {
      const result = await fetchProjectDataById(projectId);
      setState({
        ...state,
        projectPopupType: "Update",
        projectId: result.projectId,
        projectName: result.projectName,
        leadLawyerFname: result.leadLawyerFname,
        leadLawyerLname: result.leadLawyerLname,
        officeId: result.officeId,
        leadPracticeGroupId: result.leadPracticeGroupId,
        selectedTemplateId: result.templateId,
        description: result.description,
      });

      handleShow();
      console.log(result);
    } catch (err) {}
  };

  const searchProjectHandler = async (SearchBy, SearchVal) => {
    try {
      const result = await onSearchProjectData(SearchBy, SearchVal);
      setState({
        ...state,
        projects: result,
      });
    } catch (err) {}
  };

  const selectedTemplateIdVal = state.selectedTemplateId;

  return (
    <div>
      <header className="fixed-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={"/"}>
                  {" "}
                  RENSERA{" "}
                </Link>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="javascript:void(0)"
                        onClick={handleShow}
                      >
                        {" "}
                        Create New Project{" "}
                        <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/teammanager"}>
                        {" "}
                        Team / User Manager{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/templatemanager"}>
                        {" "}
                        Template Manager{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/systemmanager"}>
                        {" "}
                        System Manager{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/drupal"}>
                        {" "}
                        Drupal Integration{" "}
                      </Link>
                    </li>
                  </ul>
                  <form className="form-inline my-1 my-lg-0">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item" id="searchToggle">
                        <Link className="nav-link" onClick={searchHandler}>
                          {" "}
                          Search{" "}
                        </Link>
                      </li>
                    </ul>

                    <div className="form-group">
                      <label for="exampleInputPassword1">View</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        style={{ width: "150px" }}
                      >
                        <option>My Projects</option>
                        {state.projects.map((pitem) => (
                          <option value={pitem.projectId}>
                            {pitem.projectName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <Modal
          size="xl"
          id="create-new"
          className="create-new"
          show={state.show}
          onHide={handleClose}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {state.projectPopupType} NEW PROJECT
              </h5>

              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xl-8 col-sm-12 col-lg-6 col-md-12 col-xs-12">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">
                          Project Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="projectName"
                          onChange={myChangeHandler}
                          placeholder=""
                          value={state.projectName}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">
                          Lead Lawyer
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="leadLawyerFname"
                          onChange={myChangeHandler}
                          placeholder="First Name"
                          value={state.leadLawyerFname}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">&nbsp; </label>
                        <input
                          type="text"
                          className="form-control"
                          name="leadLawyerLname"
                          onChange={myChangeHandler}
                          placeholder="Last Name"
                          value={state.leadLawyerLname}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">Office</label>
                        <select
                          className="form-control"
                          name="officeId"
                          onChange={myChangeHandler}
                          value={state.officeId}
                        >
                          <option value="">Select Office</option>
                          {state.offices.map((item) => (
                            <option value={item.officeId}>
                              {item.officeName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">
                          Lead Practice Group
                        </label>
                        <select
                          className="form-control"
                          name="leadPracticeGroupId"
                          onChange={myChangeHandler}
                          value={state.leadPracticeGroupId}
                        >
                          <option value="">Select Group</option>
                          {state.leadPracticeGroups.map((item) => (
                            <option value={item.groupId}>
                              {item.leadPracticeGroupName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">
                          Additional Information
                        </label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="description"
                          onChange={myChangeHandler}
                        >
                          {state.description}
                        </textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="flex-box">
                        <input
                          type="hidden"
                          name="projectId"
                          value={state.projectId}
                        />
                        <button
                          type="submit"
                          className="btn mb-2"
                          /* onClick={mySubmitHandler}*/ onClick={
                            stephandleShow
                          }
                        >
                          {state.projectPopupType} Project
                        </button>
                        <button
                          type="submit"
                          className="btn mb-2"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-12 col-lg-6 col-md-12 col-xs-12">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Select Template
                    </label>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      {state.templates.map((item, i) => (
                        <div
                          id={item.templateId}
                          onClick={(e) =>
                            setState({
                              ...state,
                              selectedTemplateId: item.templateId,
                            })
                          }
                          className={`${
                            item.templateId == state.selectedTemplateId
                              ? "box Active"
                              : "box"
                          }`}
                        >
                          <img src={homeImg} />
                          <div className="right-box">
                            <div className="title">{item.templateName}</div>
                            <p>Version 12.8.6.16</p>
                            <a href="javascript:void(0)" className="btn">
                              View Template
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          size="xl"
          id="create-new"
          className="create-new"
          show={state.stepshow}
          onHide={step2handleClose}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {state.projectPopupType} NEW PROJECT
              </h5>

              <button
                type="button"
                className="close"
                onClick={step2handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xl-4 col-sm-12 col-lg-4 col-md-12 col-xs-12">
                  <p>
                    <b>Document Sections</b>
                  </p>
                  <p>
                    Click on a section to select it and allow the content panel
                    to refresh with a possible content list based on that
                    selected section. Use the button to delete, pre- view and
                    reorder the content in your sections.
                  </p>
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                          <button
                            className="btn btn-link btn-block text-left"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Section 01
                          </button>
                        </h2>
                      </div>

                      <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <ul>
                            <li>
                              - why Reniaw in the US ?
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>
                            <li>
                              - Map of US
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-up"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>

                            <li>
                              - Office List
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-up"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                          <button
                            className="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Section 02
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <ul>
                            <li>
                              - why Reniaw in the US ?
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>
                            <li>
                              - Map of US
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-up"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>

                            <li>
                              - Office List
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-up"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                          <button
                            className="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapsethree"
                            aria-expanded="false"
                            aria-controls="collapsethree"
                          >
                            Section 03
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapsethree"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <ul>
                            <li>
                              - why Reniaw in the US ?
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>
                            <li>
                              - Map of US
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-up"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>

                            <li>
                              - Office List
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-up"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="headingFour">
                        <h2 className="mb-0">
                          <button
                            className="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                          >
                            Section 04
                          </button>
                        </h2>
                      </div>
                      <div
                        id="collapseFour"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <ul>
                            <li>
                              - why Reniaw in the US ?
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>
                            <li>
                              - Map of US
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-up"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>

                            <li>
                              - Office List
                              <a href="javascript:void(0)">
                                <i className="fa fa-file"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-up"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-chevron-circle-down"></i>
                              </a>
                              <a href="javascript:void(0)">
                                <i className="fa fa-trash-o"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-sm-12 col-lg-5 col-md-12 col-xs-12">
                  <p>
                    <b>Content Panel</b>
                  </p>
                  <p>
                    Drag and drop the content below to your decument sections.
                  </p>
                  <div className="search-box">
                    <input type="text" />
                    <i className="fa fa-search"></i>
                  </div>
                  <div
                    className="accordion right-section"
                    id="accordionExample"
                  >
                    <div className="card">
                      <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                          <button
                            className="btn btn-link btn-block text-left"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapsepanel-1"
                            aria-expanded="true"
                            aria-controls="collapsepanel-1"
                          >
                            Latin America
                          </button>
                        </h2>
                      </div>

                      <div
                        id="collapsepanel-1"
                        className="collapse show"
                        aria-labelledby="headingpanel-1"
                        data-parent="#collapsepanel-1"
                      >
                        <div className="card-body">
                          <div className="accordion" id="accordionExample">
                            <div className="card">
                              <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                  <button
                                    className="btn btn-link btn-block text-left"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#collapsepanel-1-inner"
                                    aria-expanded="true"
                                    aria-controls="collapsepanel-1-inner"
                                  >
                                    Regional Overview
                                  </button>
                                </h2>
                              </div>

                              <div
                                id="collapsepanel-1-inner"
                                className="collapse show"
                                aria-labelledby="headingpanel-1-inner"
                                data-parent="#collapsepanel-1-inner"
                              >
                                <div className="card-body">
                                  <ul>
                                    <li>
                                      - why Reniaw in the US ?
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-down"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-trash-o"></i>
                                      </a>
                                    </li>
                                    <li>
                                      - Map of US
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-up"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-down"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-trash-o"></i>
                                      </a>
                                    </li>

                                    <li>
                                      - Office List
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-up"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-down"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-trash-o"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                  <button
                                    className="btn btn-link btn-block text-left collapsed"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#collapsepanel-2-inner"
                                    aria-expanded="true"
                                    aria-controls="collapsepanel-2-inner"
                                  >
                                    Regional Overview
                                  </button>
                                </h2>
                              </div>

                              <div
                                id="collapsepanel-2-inner"
                                className="collapse "
                                aria-labelledby="headingpanel-2-inner"
                                data-parent="#collapsepanel-2-inner"
                              >
                                <div className="card-body">
                                  <ul>
                                    <li>
                                      - why Reniaw in the US ?
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-down"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-trash-o"></i>
                                      </a>
                                    </li>
                                    <li>
                                      - Map of US
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-up"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-down"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-trash-o"></i>
                                      </a>
                                    </li>

                                    <li>
                                      - Office List
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-up"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-chevron-circle-down"></i>
                                      </a>
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-trash-o"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-12 col-lg-3 col-md-12 col-xs-12 projectstep2">
                  <button
                    type="submit"
                    className="btn mb-2"
                    onClick={handleShow}
                  >
                    Back to Previous Page
                  </button>
                  <button type="submit" className="btn mb-2">
                    Preview Document
                  </button>
                  <button
                    type="submit"
                    className="btn mb-2"
                    onClick={mySubmitHandler}
                  >
                    Generate Project
                  </button>
                  <br />
                  <button
                    type="submit"
                    className="btn mb-2"
                    onClick={step2handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </header>
      <div className="wrapper">
        <section className="card-view">
          <div className="container-fluid">
            <div id="sidebar-wrapper">
              <div className="left-section-nav">
                <div className="form-group">
                  <label for="exampleFormControlInput1">Search</label>
                  <div className="searchbox">
                    <input
                      type="text"
                      className="form-control"
                      name="projectSearch"
                      placeholder="Search Project By Name"
                      onChange={searchChangeHandler}
                      value={state.projectSearch}
                    />
                    <i className="fa fa-search"></i>
                  </div>
                </div>
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Search By
                        </button>
                      </h2>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <ul>
                          <li
                            onClick={() => {
                              searchProjectHandler("Project", "projectName");
                            }}
                          >
                            Project Name
                          </li>
                          <li
                            onClick={() => {
                              searchProjectHandler(
                                "Project",
                                "leadLawyerFname"
                              );
                            }}
                          >
                            Lead Lawyer
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingTwo">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Lead Practice
                        </button>
                      </h2>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <ul>
                          {state.leadPracticeGroups.map((item) => (
                            <li
                              onClick={() => {
                                searchProjectHandler("Groups", item.groupId);
                              }}
                            >
                              {item.leadPracticeGroupName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="headingThree">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Office
                        </button>
                      </h2>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      aria-labelledby="collapseThree"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <ul>
                          {state.offices.map((item) => (
                            <li
                              onClick={() => {
                                searchProjectHandler("Office", item.officeId);
                              }}
                            >
                              {item.officeName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="headingFour">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Status
                        </button>
                      </h2>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse"
                      aria-labelledby="headingFour"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <ul>
                          <li
                            onClick={() => {
                              searchProjectHandler("Status", "1");
                            }}
                          >
                            Approved
                          </li>
                          <li
                            onClick={() => {
                              searchProjectHandler("Status", "2");
                            }}
                          >
                            Unapproved
                          </li>
                          <li
                            onClick={() => {
                              searchProjectHandler("Status", "3");
                            }}
                          >
                            Archive
                          </li>
                          <li
                            onClick={() => {
                              searchProjectHandler("Status", "4");
                            }}
                          >
                            Unarchive
                          </li>
                          <li
                            onClick={() => {
                              searchProjectHandler("Status", "0");
                            }}
                          >
                            Active
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="page-content-wrapper">
              <div className="row">
                {state.projects.map((item, j) => (
                  <div className="col-xl-3 col-sm-12 col-lg-6 col-md-12 col-xs-12">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link
                            className="upload-btn"
                            to={{
                              pathname: "/layoutedit",
                              templatesProps: {
                                templateName: `${item.templateName}`,
                                layoutName: `${item.layoutName}`,
                                templateId: `${item.templateId}`,
                              },
                            }}
                            style={{
                              color: `${
                                item.projectStatus == 1
                                  ? "green"
                                  : item.projectStatus == 2
                                  ? "red"
                                  : ""
                              }`,
                            }}
                          >
                            {item.projectName}
                            {j + 1}
                          </Link>
                        </h5>
                        <div className="latest-update">
                          Latest Updated: {item.modified}
                        </div>
                        <div className="status">
                          Status:{" "}
                          {`${
                            item.projectStatus == 1
                              ? "Approved"
                              : item.projectStatus == 2
                              ? "Active (Locked)"
                              : "Active"
                          }`}
                        </div>
                        <div className="img-box-text">
                          {j == 0 ? (
                            <img
                              className="thumbnail"
                              src={cover1Img}
                              alt=""
                              width="129"
                            />
                          ) : j == 1 ? (
                            <img
                              className="thumbnail"
                              src={cover2Img}
                              alt=""
                              width="129"
                            />
                          ) : j == 2 ? (
                            <img
                              className="thumbnail"
                              src={cover3Img}
                              alt=""
                              width="129"
                            />
                          ) : j == 3 ? (
                            <img
                              className="thumbnail"
                              src={cover4Img}
                              alt=""
                              width="129"
                            />
                          ) : j == 4 ? (
                            <img
                              className="thumbnail"
                              src={cover5Img}
                              alt=""
                              width="129"
                            />
                          ) : j == 5 ? (
                            <img
                              className="thumbnail"
                              src={cover6Img}
                              alt=""
                              width="129"
                            />
                          ) : j == 6 ? (
                            <img
                              className="thumbnail"
                              src={cover7Img}
                              alt=""
                              width="129"
                            />
                          ) : j == 7 ? (
                            <img
                              className="thumbnail"
                              src={cover8Img}
                              alt=""
                              width="129"
                            />
                          ) : j == 8 ? (
                            <img
                              className="thumbnail"
                              src={cover9Img}
                              alt=""
                              width="129"
                            />
                          ) : j == 9 ? (
                            <img
                              className="thumbnail"
                              src={cover10Img}
                              alt=""
                              width="129"
                            />
                          ) : (
                            <img
                              className="thumbnail"
                              src={cover1Img}
                              alt=""
                              width="129"
                            />
                          )}

                          <div className="right-part">
                            <ul>
                              <li>Team:</li>
                              <li>
                                Creator:{item.leadLawyerFname}{" "}
                                {item.leadLawyerLname}
                              </li>
                              <li>Template: {item.templateName}</li>
                              <li>Version: 1.0.0</li>
                            </ul>
                            <div className="button-section">
                              <a
                                href="javascript:void(0)"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure to delete this record?"
                                    )
                                  ) {
                                    deleteHandler(item.projectId);
                                  }
                                }}
                                title="delete"
                              >
                                <img
                                  src={trashIconImg}
                                  className="action-icon"
                                />
                              </a>
                              <a
                                href="javascript:void(0)"
                                title="copy"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure to copy this project?"
                                    )
                                  ) {
                                    copyHandler(item.projectId);
                                  }
                                }}
                                title="create-new-project"
                              >
                                <img
                                  src={cloneIconImg}
                                  className="action-icon"
                                />
                              </a>

                              <a
                                className="setting"
                                href="javascript:void(0)"
                                title="setting"
                                onClick={
                                  settingHandler
                                } /* onClick={e => setState({...state,settingBox:item.projectId})} */
                              >
                                <img
                                  src={settingIconImg}
                                  className="action-icon"
                                />
                              </a>

                              <div
                                className="box-show" /* style={{display : `${item.projectId == state.settingBox ? "block" : "none"}`}} */
                              >
                                <ul>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className={`${
                                        item.projectStatus == "1"
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        approveHandler(item.projectId);
                                      }}
                                    >
                                      Approve
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className={`${
                                        item.projectStatus == "2"
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        unapproveHandler(item.projectId);
                                      }}
                                    >
                                      Unapprove
                                    </a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">Archive</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0)">Unarchive</a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() => {
                                        projectEditHandler(item.projectId);
                                      }}
                                    >
                                      Edit Details
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="star-icon">
                            <img src={starIconImg} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchProject;
