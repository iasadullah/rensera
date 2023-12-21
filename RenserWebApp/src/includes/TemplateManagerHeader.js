import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import homeImg from '../assets/images/home-img-01.d60eb4b9.png';
import axios from 'axios';

const TemplateManagerHeader = () => {
  const [state, setState] = useState({
    templateName: '',
    layoutType: 'Layout 2',
    description: '',
    show: false,
  })


  const handleClose = () => {
    setState({ ...state, show: false });
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
    const self = this;
    let formData = new FormData();
    formData.append('templateName', state.templateName)
    formData.append('layoutType', state.layoutType)
    formData.append('description', state.description)

    axios({
      method: 'post',
      url: 'http://localhost/rensera/services/saveTemplate',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(function (response) {
        //handle success

        if (response.data.success == '1') {
          self.handleClose();
          self.props.getAllTemplate();
        }



      })
      .catch(function (response) {
        //handle error
        console.log(response)
      });



    /* fetch('http://localhost/rensera/services/saveTemplate', {
        method: 'POST',
       // body: JSON.stringify(state),
        body: {val : state.templateName},
        headers: {
          "Content-Type": "application/json"
      }
      }).then(function(response) {
        console.log(response)
        return response.json();
      }); */







  }




  return (

    <header className="fixed-top">
      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-12 col-sm-12 col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" to={'/'} > RENSERA  </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                  <li className="nav-item">
                    <a className="nav-link" href="javascript:void(0)" onClick={handleShow} > Add New Template  <span className="sr-only">(current)</span></a>
                  </li>
                  { /* <li className="nav-item">
										<Link className="nav-link" to={'/addlayout'} > Add New Layout  </Link>
										
        </li> */ }
                </ul>

              </div>
            </nav>
          </div>
        </div>
      </div>

      <Modal size="lg" show={state.show} onHide={handleClose}>

        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">CREATE NEW TEMPLATE</h5>


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
                      <button type="submit" className="btn mb-2" onClick={mySubmitHandler}>Add New Template</button>
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


  );

}


export default TemplateManagerHeader;