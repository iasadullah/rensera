import React,{useState,useEffect }  from 'react';
import { Link } from "react-router-dom";
import { Button,Modal } from 'react-bootstrap';
import homeImg from '../assets/images/home-img-01.d60eb4b9.png';
import axios from 'axios';

const SystemManagerHeader=()=>{
	const[state,setState]=useState({
		officeName : '',
		officeAddress:'',
		leadPracticeGroupName:'',
		officeModalshow: false,
		leadPracticeModalshow: false,
	})
	

	const officeModalhandleClose=()=> {
		setState({...state, officeModalshow: false });
	}

	const officeModalhandleShow=()=> {
		setState({...state, officeModalshow: true });
	}

	const leadPracticeModalhandleClose=()=> {
		setState({...state, leadPracticeModalshow: false });
	}

	const leadPracticeModalhandleShow=()=> {
		setState({...state, leadPracticeModalshow: true });
  	}
	  



	const myChangeHandler=(event)=>{
		let nam = event.target.name;
		let val = event.target.value;
		setState({...state,[nam]: val});
		console.log(state); 
	} 

	const leadPracticeSubmitHandler = (event)=>{
		// event.preventDefault();
	 
		const self = this;
		 let formData = new FormData();
		 formData.append('leadPracticeGroupName', state.leadPracticeGroupName)
		 if(state.leadPracticeGroupName!=''){  
			axios({
				method: 'post',
				url: 'http://localhost/rensera/services/saveLeadPracticeGroup',
				data: formData,
				config: { headers: {'Content-Type': 'multipart/form-data' }}
			})
			.then(function (response) {
				//handle success
				if(response.data.success == '1'){
					self.leadPracticeModalhandleClose();
					window.location.href="/systemmanager";
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response)
			}); 
		}
	}

	
	const mySubmitHandler = (event)=>{
		// event.preventDefault();
	 
		const self = this;
		 let formData = new FormData();
		 formData.append('officeName', state.officeName)
		 formData.append('officeAddress', state.officeAddress)
		
		if(state.officeName !=''){ 
	   
		 axios({
			 method: 'post',
			 url: 'http://localhost/rensera/services/saveOffice',
			 data: formData,
			 config: { headers: {'Content-Type': 'multipart/form-data' }}
		 })
	   .then(function (response) {
		   //handle success
		   if(response.data.success == '1'){
			 self.officeModalhandleClose();
			 window.location.href="/systemmanager";
		   }
	   })
	   .catch(function (response) {
		   //handle error
		   console.log(response)
	   }); 
	}
	}
	


        return(
          
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
										<a className="nav-link" href="javascript:void(0)" onClick={leadPracticeModalhandleShow} > Add New Lead Practice Group  <span class="sr-only">(current)</span></a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="javascript:void(0)" onClick={officeModalhandleShow} > Add New Office</a>
									</li>
								</ul>
							
							</div>
						</nav>
					</div>
				</div>
			</div>
			<Modal size="lg" show={state.officeModalshow} onHide={officeModalhandleClose}>
     
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">ADD NEW Office</h5>
         

          <button type="button" className="close" onClick={officeModalhandleClose}>
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-xl-8 col-sm-12 col-lg-6 col-md-12 col-xs-12">
              
              <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label for="exampleFormControlInput1">New Office Name</label>
                  <input type="text" className="form-control" name="officeName" onChange={myChangeHandler} placeholder="Enter Office Name" value={state.officeName} />
                </div>
              </div>
			  <div className="col-md-12">
			  <div className="form-group">
				<label for="exampleFormControlInput1">Office Address</label>
				<textarea className="form-control" rows="3" name="officeAddress" onChange={myChangeHandler}>{state.officeAddress}</textarea>
			  </div>
			</div>
            
              
              <div className="col-md-12">
                <div className="flex-box">
                  <button type="submit" className="btn mb-2" onClick={mySubmitHandler}>Add New Office</button>
                  <button type="submit" className="btn mb-2" onClick={officeModalhandleClose}>Cancel</button>
                  
                </div>
              </div>
            </div>
              
            </div>
            
          </div>
        </div>
        
      </div>
    
  </Modal>

  <Modal size="lg" show={state.leadPracticeModalshow} onHide={leadPracticeModalhandleClose}>
     
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">ADD NEW Lead Practice Group</h5>
         

          <button type="button" className="close" onClick={leadPracticeModalhandleClose}>
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-xl-8 col-sm-12 col-lg-6 col-md-12 col-xs-12">
              
              <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label for="exampleFormControlInput1">New Lead Practice Group Name</label>
                  <input type="text" className="form-control" name="leadPracticeGroupName" onChange={myChangeHandler} value={state.leadPracticeGroupName} />
                </div>
              </div>
			  
              
              <div className="col-md-12">
                <div className="flex-box">
                  <button type="submit" className="btn mb-2" onClick={leadPracticeSubmitHandler}>Add New Group</button>
                  <button type="submit" className="btn mb-2" onClick={leadPracticeModalhandleClose}>Cancel</button>
                  
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

export default SystemManagerHeader;