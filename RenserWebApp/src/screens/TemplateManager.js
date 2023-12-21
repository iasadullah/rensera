import React, { useEffect, useState, createRef } from 'react';
import { Link } from "react-router-dom";
import homeImg from '../assets/images/home-img-01.d60eb4b9.png';
import darkLogo from '../assets/images/rensera_dark.png';
import starIconImg from '../assets/images/star-icon.png';
import thumbnailPreviewImg from '../assets/images/thumbnail-preview-overlay.png';
import '../assets/css/style.css';
import '../assets/css/font-awesome.min.css';
import dateFormat from 'dateformat';
import axios from 'axios';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';
import config from '../includes/config';
import { fetchAllTemplate, onDeletetemplateId, fetchTemplateDataById } from '../services/api';

const TemplateManager = () => {
  const buttonRef = createRef();
  const [state, setState] = useState({
    templatePopupType: 'Add',
    templateId: '',
    templateName: '',
    layoutName: '',
    description: '',
    show: false,
    templates: [],
    selectedFile: null,
  })

  useEffect(() => {
    getAllTemplate();
  }, [])



  const handleClose = () => {
    setState({ ...state, show: false, templateName: '', layoutName: '', description: '', templateId: '', templatePopupType: 'Add' });
  }

  const handleShow = () => {
    setState({ ...state, show: true });
  }

  const myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    setState({ ...state, [nam]: val });
    console.log(state)

  }

  const mySubmitHandler = (event) => {
    // event.preventDefault();
    let formData = new FormData();
    formData.append('templateName', state.templateName)
    formData.append('layoutType', state.layoutType)
    formData.append('description', state.description)
    formData.append('templateId', state.templateId)

    axios({
      method: 'post',
      url: config.API_URL + 'saveTemplate',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(function (response) {
        //handle success

        if (response.data.success == '1') {
          setState({ ...state, templateName: '', description: '', layoutName: '', templateId: '', templatePopupType: 'Add' });
          handleClose();
          getAllTemplate();
        }



      })
      .catch(function (response) {
        //handle error
        console.log(response)
      });
  }

  const getAllTemplate = async () => {
    try {
      const result = await fetchAllTemplate()
      setState({
        ...state,
        templates: result
      });
    } catch (err) {

    }

  }



  const deleteHandler = async (templateId) => {
    try {
      await onDeletetemplateId(templateId)
      getAllTemplate();
      console.log('Deleted Successfully.');
    } catch (err) {

    }

  }

  const templateEditHandler = async (templateId) => {
    try {
      const result = await fetchTemplateDataById(templateId)
      setState({
        ...state,
        templateName: result.templateName,
        layoutName: result.layoutName,
        description: result.description,
        templateId: result.templateId,
        templatePopupType: 'Update',

      });
      handleShow();
      console.log(result);
    } catch (err) {

    }

  }

  const handleClick = () => {
    buttonRef.current.click();
  }


  const onFileChange = (event) => {

    let filevalue = event.target.files[0];
    let tid = event.target.id;
    let formData = new FormData();
    formData.append('masterLayout', filevalue)
    formData.append('templateId', tid)

    axios({
      method: 'post',
      url: config.API_URL + 'saveMasterLayout',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(function (response) {
        //handle success

        if (response.data.success == '1') {
          $('.alert-success').show();
          setTimeout(function () {
            $('.alert-success').hide();
          }, 5000)
        } else {
          $('.alert-danger').show();
          setTimeout(function () {
            $('.alert-danger').hide();
          }, 5000)

        }



      })
      .catch(function (response) {
        //handle error
        console.log(response)
      });




    // setState({...state,selectedFile:filevalue,templateId:tid});
    // layoutSubmitHandler();       
  };


  const layoutSubmitHandler = (event) => {
    // event.preventDefault();

    let formData = new FormData();
    formData.append('masterLayout', state.selectedFile)
    formData.append('templateId', state.templateId)
    console.log(state.templateId);
    axios({
      method: 'post',
      url: config.API_URL + 'saveMasterLayout',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(function (response) {
        //handle success

        if (response.data.success == '1') {
          setState({ ...state, templateId: '', selectedFile: '' });
          getAllTemplate();

          $('.alert-success').show();
          setTimeout(function () {
            $('.alert-success').hide();
          }, 2000)

        } else {
          alert("please enter only pdf file");
        }



      })
      .catch(function (response) {
        //handle error
        console.log(response)
      });
  }



  return (
    <div>
      <header className="fixed-top">
        <div className="container-fluid">
          <div className="row">

            <div className="col-lg-12 col-sm-12 col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={'/home'} > <img src={darkLogo} width="100px" />  </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                      <a className="nav-link" href="javascript:void(0)" onClick={handleShow} > Add New Template  <span className="sr-only">(current)</span></a>
                    </li>
                    {	/* <li className="nav-item">
										<Link className="nav-link" to={'/demoeditor'} > Add New Layout  </Link>
										
        </li> */}
                  </ul>

                </div>
              </nav>
            </div>
          </div>
        </div>

        <Modal size="lg" id="create-new" show={state.show} onHide={handleClose}>

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{state.templatePopupType} New Template </h5>


              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xl-12 col-sm-12 col-lg-6 col-md-12 col-xs-12">

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">Template Name</label>
                        <input type="text" className="form-control" name="templateName" onChange={myChangeHandler} placeholder="" value={state.templateName} />
                      </div>
                    </div>
                    { /* <div className="col-md-12">
                <div className="form-group">
                  <label for="exampleFormControlInput1">Layout</label>
                  <select className="form-control" name="layoutType" onChange={myChangeHandler} value={state.layoutType}>
                  <option value="">Select Layout</option>
                  <option value="Layout 1">Layout 1</option>
                  <option value="Layout 2">Layout 2</option>
                  <option value="Layout 3">Layout 3</option>
                </select>
                </div>
      </div> */ }
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="exampleFormControlInput1">Additional Information</label>
                        <textarea className="form-control" rows="3" name="description" onChange={myChangeHandler}>{state.description}</textarea>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="flex-box">
                        <input type="hidden" name="layoutName" value={state.layoutName} />
                        <input type="hidden" name="templateId" value={state.templateId} />
                        <button type="submit" className="btn mb-2" onClick={mySubmitHandler}>{state.templatePopupType} New Template</button>
                        <button type="submit" className="btn mb-2" onClick={handleClose}>Cancel</button>

                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </Modal>



      </header>
      <div className="wrapper">
        <div className="alert alert-success">
          <strong>Success!</strong> Successfully Uploaded new version template.
        </div>
        <div class="alert alert-danger">
          <strong>Danger!</strong> Please upload only PDF file.
        </div>
        <section className="card-view">
          <div className="container-fluid">
            <div className="row">
              {state.templates.map((item, index) => (
                <div key={index} className="col-xl-3 col-sm-6 col-lg-4 col-md-6 col-xs-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title"><a href="javascript:void(0)">{item.templateName}</a></h5>
                      <div className="latest-update">
                        Latest Updated: {item.modified}
                      </div>
                      <div className="img-box-text">
                        <div className="thumbnail">
                          {
                            (item.templateImage != null) ?
                              <img className="thumb" src={config.IMG_URL + '' + item.templateImage} alt="" width="129" />
                              :
                              <img className="thumb" src={homeImg} alt="" width="129" />
                          }
                          <a className="thumbPreview" href="javascript:void(0)"><img src={thumbnailPreviewImg} alt="" /></a>
                        </div>
                        <div className="right-part">
                          <ul>
                            <li>Version:</li>
                            <li>Layout</li>
                          </ul>
                          {/* <button onClick={handleClick()}>UPLOAD NEW VERSION</button> */}
                          <div className="fileupload">
                            <input type="file" name="masterlayout" id={item.templateId} onChange={(event) => onFileChange(event)} />
                          </div>

                          <div className="button-section">
                            <a href="javascript:void(0)" onClick={() => { if (window.confirm('Are you sure to delete this record?')) { deleteHandler(item.templateId) }; }} title="delete"><i className="fa fa-trash-o"></i></a>
                            <a href="javascript:void(0)" onClick={() => { templateEditHandler(item.templateId) }} title="edit"><i className="fa fa-pencil-square-o"></i></a>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        </section>

      </div>
    </div>


  )
}



export default TemplateManager;