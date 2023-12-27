import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import homeImg from "../assets/images/home-img-01.d60eb4b9.png";
import darkLogo from "../assets/images/rensera_dark.png";
import thumbnailPreviewImg from "../assets/images/thumbnail-preview-overlay.png";
import dateFormat from "dateformat";
import axios from "axios";
import {
  onSearchProjectData,
  fetchProjectDataById,
  onChangeProjectStatus,
  ondeleteProject,
  fetchAllProject,
  fetchAllOffices,
  fetchAllLeadPracticeGroups,
  fetchAllTeam,
  fetchAllIndustry,
  fetchAllTemplate,
  getAllTemplateList,
  getAllTemplateListApi,
  createNewProjectApi,
  genereateHtmlApi,
  getFileMetaData,
} from "../services/api";
import config from "../includes/config";
import $ from "jquery";
import ProductCard from "../components/productCard";
const Product = () => {
  const [state, setState] = useState({
    projectPopupType: "Create",
    projectId: "",
    projectName: "",
    creatorFname: "",
    creatorLname: "",
    leadLawyerFname: "",
    leadLawyerLname: "",
    officeId: "",
    industryId: "",
    teamId: "",
    version: "1.0.1",
    leadPracticeGroupId: "",
    selectedTemplateId: "",
    layoutName: "",
    description: "",
    show: false,
    stepshow: false,
    imgPreviewshow: false,
    settingBox: "",
    projectSearch: "",
    previewImg: "",
    offices: [],
    teams: [],
    industries: [],
    leadPracticeGroups: [],
    templates: [],
    projects: [],
  });
  const [templateList, setTemplateList] = useState([]);
  const [templateId, setTemplateId] = useState(-1);

  useEffect(() => {
    getAllProject();
    getAllOffices();
    getAllLeadPracticeGroups();
    getAllTeam();
    getAllIndustry();
    getAllTemplateList();
    //AppendScript("../assets/js/customs.js");

    $("#root").on("click", function (e) {
      if ($(e.target).closest(".setting").length === 0) {
        $(".box-show").hide();
      }
    });
  }, []);
  useEffect(() => {
    console.log("products ::", state.show);
  }, [state.show]);

  const handleClose = () => {
    setState({
      ...state,
      show: false,
      stepshow: false,
      imgPreviewshow: false,
      projectPopupType: "Create",
      projectId: "",
      projectName: "",
      creatorFname: "",
      creatorLname: "",
      leadLawyerFname: "",
      leadLawyerLname: "",
      officeId: "",
      teamId: "",
      version: "1.0.1",
      industryId: "",
      leadPracticeGroupId: "",
      selectedTemplateId: "",
      description: "",
    });
  };

  const handleShow = () => {
    setState({ ...state, show: true, stepshow: false, imgPreviewshow: false });
    getAllTemplate();
  };

  const step2handleClose = () => {
    setState({
      ...state,
      show: false,
      stepshow: false,
      imgPreviewshow: false,
      projectPopupType: "Create",
      projectId: "",
      projectName: "",
      creatorFname: "",
      creatorLname: "",
      leadLawyerFname: "",
      leadLawyerLname: "",
      officeId: "",
      teamId: "",
      version: "1.0.1",
      industryId: "",
      leadPracticeGroupId: "",
      selectedTemplateId: "",
      description: "",
    });
  };

  const stephandleShow = () => {
    setState({ ...state, show: false, stepshow: true, imgPreviewshow: false });
  };

  const previewhandleClose = () => {
    setState({ ...state, show: false, stepshow: false, imgPreviewshow: false });
  };
  const previewhandleShow = () => {
    setState({ ...state, show: false, stepshow: false, imgPreviewshow: true });
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
    if (nam == "viewProjects") {
      viewProjectHandler("Status", val);
    } else {
      searchProjectHandler("Search", val);
    }
  };

  const mySubmitHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("projectName", state.projectName);
    formData.append("creatorFname", state.creatorFname);
    formData.append("creatorLname", state.creatorLname);
    formData.append("leadLawyerFname", state.leadLawyerFname);
    formData.append("leadLawyerLname", state.leadLawyerLname);
    formData.append("officeId", state.officeId);
    formData.append("teamId", state.teamId);
    formData.append("version", state.version);
    formData.append("industryId", state.industryId);
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
            projectId: response.data.projectId,
            projectName: state.projectName,
            show: false,
            stepshow: true,
          });
          //handleClose();
          //stephandleShow();
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

  const getAllTeam = async () => {
    try {
      const result = await fetchAllTeam();
      setState({
        ...state,
        teams: result,
      });
    } catch (err) {}
  };

  const getAllIndustry = async () => {
    try {
      const result = await fetchAllIndustry();
      setState({
        ...state,
        industries: result,
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
      console.log("this is template List :: ", result);
      setState({
        ...state,
        templates: result,
        show: true,
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
    } catch (err) {
      console.log("asfasfsdf", err);
    }
  };

  const deleteHandler = async (projectId) => {
    try {
      await ondeleteProject(projectId);
      getAllProject();
    } catch (err) {}
  };

  const copyHandler = (projectId) => {
    alert(projectId);
    axios.get(config.API_URL + "copyProject/" + projectId).then((result) => {
      getAllProject();
      console.log("Copied Successfully.");
    });
  };

  const changeStatusHandler = async (projectId, status) => {
    try {
      $(".box-show").hide();
      await onChangeProjectStatus(projectId, status);
      getAllProject();
    } catch (err) {}
  };

  const previewHandler = (e) => {
    let previewimage = $(e.target).parent().parent().find(".thumb").attr("src");
    setState({
      ...state,
      show: false,
      stepshow: false,
      imgPreviewshow: true,
      previewImg: previewimage,
    });
  };

  const settingHandler = (e) => {
    $(e.target).parent().parent().find(".box-show").toggle();
  };

  const searchHandler = (e) => {
    $("#sidebar-wrapper").toggle();
    $("#page-content-wrapper .row").children().toggleClass("col-xl-4");
  };

  const projectEditHandler = async (projectId, action) => {
    try {
      $(".box-show").hide();
      const result = await fetchProjectDataById(projectId);
      if (action == "edit") {
        setState({
          ...state,
          projectPopupType: "Update",
          projectId: result.projectId,
        });
      } else {
        setState({
          ...state,
          projectPopupType: "Duplicate",
          projectId: "",
        });
      }
      setState({
        ...state,
        projectName: result.projectName,
        creatorFname: result.creatorFname,
        creatorLname: result.creatorLname,
        leadLawyerFname: result.leadLawyerFname,
        leadLawyerLname: result.leadLawyerLname,
        officeId: result.officeId,
        teamId: result.teamId,
        version: result.version,
        industryId: result.industryId,
        leadPracticeGroupId: result.leadPracticeGroupId,
        selectedTemplateId: result.templateId,
        description: result.description,
      });

      handleShow();
    } catch (err) {}
  };

  const searchProjectHandler = async (SearchBy, SearchVal) => {
    try {
      const result = await onSearchProjectData(SearchBy, SearchVal);
      setState({
        ...state,
        projects: result,
      });
      $("#page-content-wrapper .row").children().addClass("col-xl-4");
    } catch (err) {}
  };

  const viewProjectHandler = async (SearchBy, SearchVal) => {
    try {
      const result = await onSearchProjectData(SearchBy, SearchVal);
      setState({
        ...state,
        projects: result,
      });
      // $("#page-content-wrapper .row").children().addClass("col-xl-4");
    } catch (err) {}
  };

  const refreshPageHandler = () => {
    if ($("#sidebar-wrapper").is(":hidden")) {
      getAllProject();
    } else {
      $("#sidebar-wrapper").toggle();
      $("#page-content-wrapper .row").children().toggleClass("col-xl-4");
      getAllProject();
    }
  };

  const getAllTemplateList = async () => {
    try {
      const result = await getAllTemplateListApi();
      console.log("getAllTemplateList :: ", result);
      if (result.status == 200) {
        setTemplateList(result.response);
      }
    } catch (error) {
      console.log("getAllTemplateList error :: ", error);
    }
  };

  const onSelectTemplate = (_templateId, _templateFile) => {
    console.log("onSelectTemplate :: ", _templateId, _templateFile);
    setTemplateId(_templateId);
    getFileMetaData(_templateFile);
  };

  const onCreateNewProjectPressed = async () => {
    try {
      let data = {
        projectName: state.projectName,
        creatorFirstName: state.creatorFname,
        creatorLastName: state.creatorLname,
        templateId: templateId,
      };
      let response = await createNewProjectApi(data);
      if (response.status == 201) {
        if (
          response.response.toLowerCase() === "project created successfully"
        ) {
          console.log("project created successfully");
          let response = await genereateHtmlApi();
        }
      }
    } catch (error) {
      console.log("onCreateNewProjectPressed error :: ", error);
    }
  };
  return (
    <div>
      <header className="fixed-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a
                  className="navbar-brand"
                  href="javascript:void(0)"
                  onClick={refreshPageHandler}
                >
                  {" "}
                  <img src={darkLogo} width="100px" />{" "}
                </a>

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
                        name="viewProjects"
                        id="exampleFormControlSelect1"
                        style={{ width: "150px" }}
                        onChange={searchChangeHandler}
                        value={state.viewProjects}
                      >
                        <option value="0">My Projects</option>
                        <option value="1">Active</option>
                        <option value="2">Active - Locked</option>
                        <option value="3">Sent for Review</option>
                        <option value="4">Approved</option>
                        <option value="5">Archived</option>
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
                {state.projectPopupType == "Create"
                  ? state.projectPopupType + " NEW PROJECT"
                  : state.projectPopupType + " PROJECT"}
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
                        <label for="exampleFormControlInput1">Creator</label>
                        <input
                          type="text"
                          className="form-control"
                          name="creatorFname"
                          onChange={myChangeHandler}
                          placeholder="First Name"
                          value={state.creatorFname}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">&nbsp; </label>
                        <input
                          type="text"
                          className="form-control"
                          name="creatorLname"
                          onChange={myChangeHandler}
                          placeholder="Last Name"
                          value={state.creatorLname}
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
                    {/* <div className="col-md-12">
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
                        <label for="exampleFormControlInput1">Industry</label>
                        <select
                          className="form-control"
                          name="industryId"
                          onChange={myChangeHandler}
                          value={state.industryId}
                        >
                          <option value="">Select Industry</option>
                          {state.industries.map((item) => (
                            <option value={item.industryId}>
                              {item.industryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">Team</label>
                        <select
                          className="form-control"
                          name="teamId"
                          onChange={myChangeHandler}
                          value={state.teamId}
                        >
                          <option value="">Select Team</option>
                          {state.teams.map((item) => (
                            <option value={item.teamId}>{item.teamName}</option>
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
                    </div> */}
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
                          onClick={() =>
                            onCreateNewProjectPressed()
                          } /* onClick={stephandleShow}*/
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
                      {templateList.map((item, i) => (
                        <div
                          id={item.id}
                          // onClick={(e) =>
                          //   setState({
                          //     selectedTemplateId: item.templateId,
                          //     layoutName: item.layoutName,
                          //   })
                          // }
                          onClick={() =>
                            onSelectTemplate(item.id, item.filename)
                          }
                          className={`${
                            item.id == templateId ? "box Active" : "box"
                          }`}
                        >
                          <div className="thumbnail">
                            {item.image !== null ? (
                              <img
                                className="thumb"
                                // src={config.IMG_URL + "" + item.templateImage}
                                src={item.image}
                                alt=""
                                width="129"
                              />
                            ) : (
                              <img
                                className="thumb"
                                src={homeImg}
                                alt=""
                                width="129"
                              />
                            )}
                            <a
                              className="thumbPreview"
                              href="javascript:void(0)"
                            >
                              <img src={thumbnailPreviewImg} alt="" />
                            </a>
                          </div>
                          <div className="right-box">
                            <div className="title">{item.name}</div>
                            <p>Version 1.0.1</p>
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
          id="create-new-project"
          className="create-new"
          show={state.stepshow}
          onHide={step2handleClose}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {state.projectPopupType} NEW PROJECT{" "}
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
                              - Why Renlaw in the US ?
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
                              - Why Renlaw in the US ?
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
                              - Why Renlaw in the US ?
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
                              - Why Renlaw in the US ?
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
                            Firm Overviews
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
                                      - Why Renlaw in the US ?
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                    </li>
                                    <li>
                                      - Map of US
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                    </li>

                                    <li>
                                      - Office List
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
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
                                      - Why Renlaw in the UK ?
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                    </li>
                                    <li>
                                      - Map of US
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
                                      </a>
                                    </li>

                                    <li>
                                      - Office List
                                      <a href="javascript:void(0)">
                                        <i className="fa fa-file"></i>
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
                    className="btn mb-2" /* onClick={mySubmitHandler}*/
                  >
                    <Link
                      to={{
                        pathname: "/layoutedit",
                        templatesProps: {
                          projectName: `${state.projectName}`,
                          layoutName: `${state.productLayoutName}`,
                          projectId: `${state.projectId}`,
                        },
                      }}
                    >
                      {" "}
                      Generate Project{" "}
                    </Link>
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
        <Modal
          size="sm"
          id="imagemodal"
          show={state.imgPreviewshow}
          onHide={previewhandleClose}
        >
          <div className="modal-body">
            <button
              type="button"
              className="close"
              onClick={previewhandleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <center>
              <img
                src={state.previewImg}
                className="imgpreview"
                style={{ width: "350px", height: "470px" }}
              />
            </center>
          </div>
        </Modal>
      </header>
      <div className="wrapper">
        <section className="card-view">
          <div className="container-fluid">
            <div className="search-section">
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
                              Active
                            </li>
                            <li
                              onClick={() => {
                                searchProjectHandler("Status", "2");
                              }}
                            >
                              Active - Locked
                            </li>
                            <li
                              onClick={() => {
                                searchProjectHandler("Status", "3");
                              }}
                            >
                              Sent for Review
                            </li>
                            <li
                              onClick={() => {
                                searchProjectHandler("Status", "4");
                              }}
                            >
                              Approved
                            </li>
                            <li
                              onClick={() => {
                                searchProjectHandler("Status", "5");
                              }}
                            >
                              Archived
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
                    <ProductCard
                      item={item}
                      previewHandler={previewHandler}
                      deleteHandler={deleteHandler}
                      projectEditHandler={projectEditHandler}
                      settingHandler={settingHandler}
                      changeStatusHandler={changeStatusHandler}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;
