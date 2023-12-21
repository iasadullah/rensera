import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import homeImg from "../assets/images/home-img-01.d60eb4b9.png";
import axios from "axios";
import {
  fetchAllOffices,
  fetchAllLeadPracticeGroups,
  fetchAllTemplate,
} from "../services/api";

const MainHeader = () => {
  const [state, setState] = useState({
    projectName: "",
    leadLawyerFname: "",
    leadLawyerLname: "",
    officeId: "",
    leadPracticeGroupId: "",
    description: "",
    show: false,
    offices: [],
    leadPracticeGroups: [],
    templates: [],
  });

  const handleClose = () => {
    setState({ ...state, show: false });
  };

  const handleShow = () => {
    getAllOffices();
    getAllLeadPracticeGroups();
    getAllTemplate();
    setState({ ...state, show: true });
  };

  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setState({ ...state, [nam]: val });
    console.log(state);
  };

  const selectTemplatehandle = (event) => {
    console.log(event.target);
    alert(event.target.id);
    //setState({...state,templateId: templateId});
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
    formData.append("templateId", state.templateId);
    formData.append("description", state.description);

    axios({
      method: "post",
      url: "http://localhost/rensera/services/saveProject",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        //handle success

        if (response.data.success == "1") {
          handleClose();
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

  const { showModal } = state;

  return (
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
                      class="nav-link"
                      href="javascript:void(0)"
                      onClick={handleShow}
                    >
                      {" "}
                      Create New Project <span class="sr-only">(current)</span>
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
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="form-group">
                    <label for="exampleInputPassword1">View</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option>My Projects</option>
                      <option>My Projects 1</option>
                      <option>My Projects 2</option>
                      <option>My Projects 3</option>
                      <option>My Projects 4</option>
                    </select>
                  </div>
                </form>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <Modal size="xl" id="create-new" show={true} onHide={handleClose}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              CREATE NEW PROJECT
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
                      <label for="exampleFormControlInput1">Project Name</label>
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
                      <label for="exampleFormControlInput1">Lead Lawyer</label>
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
                      <button
                        type="submit"
                        className="btn mb-2"
                        onClick={mySubmitHandler}
                      >
                        Create Project
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
                  <label for="exampleFormControlInput1">Select Template</label>
                </div>

                <div className="card">
                  <div className="card-body">
                    {state.templates.map((item) => (
                      <div
                        className="box"
                        id={item.templateId}
                        onClick={selectTemplatehandle}
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
    </header>
  );
};

export default MainHeader;
