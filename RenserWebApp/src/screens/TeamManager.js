import React,{useState,useEffect}  from 'react';
import { Link } from "react-router-dom";
import homeImg from '../assets/images/home-img-01.d60eb4b9.png';
import darkLogo from '../assets/images/rensera_dark.png';
import thumbnailPreviewImg from '../assets/images/thumbnail-preview-overlay.png';
import starIconImg from '../assets/images/star-icon.png';
import axios from 'axios';
import $ from 'jquery'
import { Button,Modal } from 'react-bootstrap';
import config from '../includes/config';
import { fetchTeamAllDetails,fetchAllTeamMemberList,fetchAllTeam,fetchAllTeamProjectList,onDeleteTeamMember,onDeleteTeam,fetchTeamMemberDataById,fetchTeamDataById } from '../services/api';

const TeamManager =()=>{
		const [state,setState]=useState({
			teamMemberPopupType : 'Add',
			teamPopupType : 'Add',
			selectedTeamName: 'All Team Members',
			teamMemberId : '',
			teamMemberName : '',
			teamId:'',
			teamName:'',
			transferteamId:'',
			teamModalshow: false,
			transferteamModalshow: false,
            teamMemberModalshow: false,
			teamMembers: [],
			teamProjects: [],
			teams: []
		  })
		
	useEffect(()=>{
		getAllTeamMember();
		getAllTeam();
		getAllTeamProjects();
	},[])

	const teamModalhandleClose=()=> {
		setState({...state, teamModalshow: false,teamName:'',teamId:'',teamPopupType:'Add' });
	}

	const teamModalhandleShow=()=> {
		setState({...state, teamModalshow: true });
	}

   
	const transferteamModalhandleClose=()=> {
		setState({...state, transferteamModalshow: false,teamMemberName:'',teamId:'',transferteamId:'',teamMemberId:''});
	}

	const transferteamModalhandleShow=()=> {
		setState({...state, transferteamModalshow: true });
	} 



	const teamMemberModalhandleClose=()=> {
		setState({...state, teamMemberModalshow: false,teamMemberName:'',teamId:'',teamMemberId:'',teamMemberPopupType:'Add'});
	}

	const teamMemberModalhandleShow=()=> {
        getAllTeam();    
		setState({...state, teamMemberModalshow: true });
  	}
	  



	const myChangeHandler=(event)=>{

		let nam = event.target.name;
		let val = event.target.value;
		setState({...state,[nam]: val});
  
		console.log(state); 
	} 

	const teamSubmitHandler = (event)=>{
		// event.preventDefault();
	 
		 let formData = new FormData();
		 formData.append('teamName', state.teamName)
		 formData.append('teamId', state.teamId)
		 if(state.teamName!=''){  
			axios({
				method: 'post',
				url: config.API_URL+'saveTeam',
				data: formData,
				config: { headers: {'Content-Type': 'multipart/form-data' }}
			})
			.then(function (response) {
				//handle success
				if(response.data.success == '1'){
					setState({...state,teamName:'',teamId:'',teamPopupType:'Add'});
					teamModalhandleClose();
					getAllTeam();
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response)
			}); 
		}
	}


	const transferteamSubmitHandler = (event)=>{
		// event.preventDefault();
	 
		 let formData = new FormData();
		 formData.append('teamMemberId', state.teamMemberId)
		 formData.append('transferteamId', state.transferteamId)
		 
		axios({
			method: 'post',
			url: config.API_URL+'transferTeam',
			data: formData,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		.then(function (response) {
			//handle success
			if(response.data.success == '1'){
				transferteamModalhandleClose();
				getAllTeamMember();
			}
		})
		.catch(function (response) {
			//handle error
			console.log(response)
		}); 
		
	}

	
	const mySubmitHandler = (event)=>{
		// event.preventDefault();
	 
		 let formData = new FormData();
		 formData.append('teamMemberName', state.teamMemberName)
		 formData.append('teamId', state.teamId)
		 formData.append('teamMemberId', state.teamMemberId)

		if(state.teamMemberName !='' && state.teamId !=''){ 
			
		 axios({
			 method: 'post',
			 url: config.API_URL+'saveTeamMember',
			 data: formData,
			 config: { headers: {'Content-Type': 'multipart/form-data' }}
		 })
	   .then(function (response) {
		   //handle success
		   if(response.data.success == '1'){
			  setState({...state,teamMemberName:'',teamId:'',teamMemberId:'',teamMemberPopupType:'Add'}); 
			 teamMemberModalhandleClose();
			getAllTeamMember();
		   }
	   })
	   .catch(function (response) {
		   //handle error
		   console.log(response)
	   }); 
	}
	}



	


	const getAllTeamMember=async()=>{
		try{
         const result=await fetchAllTeamMemberList()
		 setState({...state,
            teamMembers: result
          });
		}catch(err){

		}
		
	}

	const getAllTeamProjects=async()=>{
		try{
         const result=await fetchAllTeamProjectList();
		 setState({...state,
            teamProjects: result
          });
		}catch(err){

		}
		
	}


	const getAllTeam=async()=>{
		try{
            const result=await fetchAllTeam()
			setState({...state,
				teams: result
			  });
		}catch(err){

		}
	
	}




	const deleteTeamMemberHandler =async (officeId)=>{
		try{
          await onDeleteTeamMember(officeId)
			getAllTeamMember();

		}catch(err){

		}
				
	  }

	  const deleteTeamHandler =async (teamId)=>{
        try{
         await onDeleteTeam()
		 getAllTeam();
		}catch(err){

		}
			
	  }

	  const teamMemberEditHandler =async(teamMemberId)=>{
		try{
          const result=await fetchTeamMemberDataById(teamMemberId)
		  setState({...state,
			teamMemberName : result.teamMemberName,
			teamId:result.teamId,
			teamMemberPopupType:'Update',
			teamMemberId:result.teamMemberId,
		});

		teamMemberModalhandleShow();	
		}catch(err){

		}
			
	  }

	  const teamEditHandler =async(teamId)=>{
		try{
        const result=await fetchTeamDataById(teamId)
		setState({...state,
			teamName : result.teamName,
			teamId:result.teamId,
			teamPopupType:'Update',
		});

		teamModalhandleShow();	
		}catch(err){

		}
	
	  }

      const teamTransferHandler =(teamMemberId,teamMemberName,teamId)=>{

		setState({...state, 
			teamMemberId : teamMemberId, 
			teamMemberName : teamMemberName,	
			transferteamId : teamId,
		});
        transferteamModalhandleShow();		
	} 


	const teamDetailDisplayHandler =async(teamId)=>{
		try{
         const result=await fetchTeamAllDetails(teamId)
		 setState({...state,
			selectedTeamName : result.teams.teamName,
			teamMembers:result.teamMembers,
			teamProjects:result.teamProjects,
			//teamPopupType:'Update',
		});
		}catch(err){

		}
		
	  }	

	

        return(
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
										<a className="nav-link" href="javascript:void(0)" onClick={teamModalhandleShow} > Add New Team  <span class="sr-only">(current)</span></a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="javascript:void(0)" onClick={teamMemberModalhandleShow} > Add New Member to Team</a>
									</li>
								</ul>
							
							</div>
						</nav>
					</div>
				</div>
			</div>
			<Modal size="sm" id="create-new" show={state.teamMemberModalshow} onHide={teamMemberModalhandleClose}>
     
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">{state.teamMemberPopupType} New Member To Team</h5>
         

          <button type="button" className="close" onClick={teamMemberModalhandleClose}>
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-xl-12 col-sm-12 col-lg-6 col-md-12 col-xs-12">
              
              <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label for="exampleFormControlInput1">Team Member Name</label>
                  <input type="text" className="form-control" name="teamMemberName" onChange={myChangeHandler} placeholder="Enter Team Member Name" value={state.teamMemberName} />
                </div>
              </div>
			  <div className="col-md-12">
			  <div className="form-group">
				<label for="exampleFormControlInput1">Choose Teams </label>
				<select className="form-control" name="teamId" onChange={myChangeHandler} value={state.teamId}>
                  <option value="">Select Team</option>
                  {state.teams.map(item => (
                    <option value={item.teamId}>{item.teamName}</option>
                  ))}
                  
                </select>
			  </div>
			</div>
            
              
              <div className="col-md-12">
				<div className="flex-box">
				<input type="hidden" name="teamMemberId" value={state.teamMemberId} />	
                  <button type="submit" className="btn mb-2" onClick={mySubmitHandler}>{state.teamMemberPopupType} New Team Member</button>
                  <button type="submit" className="btn mb-2" onClick={teamMemberModalhandleClose}>Cancel</button>
                  
                </div>
              </div>
            </div>
              
            </div>
            
          </div>
        </div>
        
      </div>
    
  </Modal>

  <Modal size="sm" id="create-new" show={state.teamModalshow} onHide={teamModalhandleClose}>
     
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">{state.teamPopupType} New Team</h5>
         

          <button type="button" className="close" onClick={teamModalhandleClose}>
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-xl-12 col-sm-12 col-lg-6 col-md-12 col-xs-12">
              
              <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label for="exampleFormControlInput1">New Team Name</label>
                  <input type="text" className="form-control" name="teamName" onChange={myChangeHandler} value={state.teamName} />
                </div>
              </div>
			  
              
              <div className="col-md-12">
				<div className="flex-box">
				<input type="hidden" name="teamId" value={state.teamId} />	
                  <button type="submit" className="btn mb-2" onClick={teamSubmitHandler}>{state.teamPopupType} New Team</button>
                  <button type="submit" className="btn mb-2" onClick={teamModalhandleClose}>Cancel</button>
                  
                </div>
              </div>
            </div>
              
            </div>
            
          </div>
        </div>
        
      </div>
    
  </Modal>
  
  <Modal size="sm" id="create-new" show={state.transferteamModalshow} onHide={transferteamModalhandleClose}>
     
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">Transfer User To Another Team</h5>
         

          <button type="button" className="close" onClick={transferteamModalhandleClose}>
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
		  <div className="row">
		  <div class="col-xl-12 col-sm-12 col-lg-12 col-md-12 col-xs-12">
		  <center>Transfer {state.teamMemberName} to</center>
		  <br />
		 
			  <div class="row">
				  <div class="col-md-12">
					  <div class="form-group">
						  <select name=""  class="form-control" name="transferteamId" onChange={myChangeHandler} value={state.transferteamId}>
							 

							  {state.teams.map(item => (

								<option value={item.teamId}>{item.teamName}</option>
								
								))}	

							  
						  </select>
					  </div>
				  </div>
				  
				  <div class="col-md-12">
					  <div class="flex-box">
					  		<input type="hidden" name="teamMemberId" value={state.teamMemberId} />	
					  		<button type="submit" className="btn mb-2" onClick={transferteamSubmitHandler}>Reassign User</button>
					 		<button type="submit" className="btn mb-2" onClick={transferteamModalhandleClose}>Cancel</button>	
				  
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
			<section className="systm-manager-section teamsusers-section">
				<div className="container-fluid">
					<div className="row">
				
						<div className="col-xl-2 col-sm-12 col-lg-3 col-md-4 col-xs-12">
							<div className="card">
								<div className="card-body">
									<ul className="group">
									{state.teams.map(item => (
										<li>
											<b  onClick={() =>{teamDetailDisplayHandler(item.teamId)}}>{item.teamName}</b> 
											<a href="javascript:void(0)" onClick={() => {if(window.confirm('Are you sure to delete this record?')){ deleteTeamHandler(item.teamId)};}} title="delete">
												<i className="fa fa-trash-o"></i>
											</a>
											<a href="javascript:void(0)" onClick={() =>{teamEditHandler(item.teamId)}} title="edit">
												<i className="fa fa-pencil-square-o"></i>
											</a>
										</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						<div className="col-xl-10 col-sm-12 col-lg-9 col-md-8 col-xs-12">
							<div className="title">{state.selectedTeamName}</div>
							<div className="row">
								<div className="col-xl-6 col-sm-12 col-lg-6 col-md-12 col-xs-12">
									<div className="inner-box">
									<div className="title">Team Member ({state.teamMembers.length})</div>
									<div className="row">
										{state.teamMembers.map(titem => (
										<div className="col-xl-6 col-sm-12 col-lg-6 col-md-12 col-xs-12">
											<div className="card">
												<div className="card-body">
													<div className="box">
														<div className="left-sec">
															<div className="title">{titem.teamMemberName}</div>
															<div className="mar-a">
																<a href="javascriot:void(0)">{titem.teamName}</a>
															</div>
														</div>
														<div className="icon-section">
															<a href="javascriot:void(0)" onClick={() => {if(window.confirm('Are you sure to delete this record?')){ deleteTeamMemberHandler(titem.teamMemberId)};}} title="delete"><i className="fa fa-trash-o"></i></a>
															<a href="javascriot:void(0)" onClick={() =>{teamTransferHandler(titem.teamMemberId,titem.teamMemberName,titem.teamId)}} title="transferTeam"><i className="fa fa-refresh"></i></a>
															<a href="javascript:void(0)"  onClick={()=>{teamMemberEditHandler(titem.teamMemberId)}} title="edit">
																<i className="fa fa-pencil-square-o"></i>
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
										))}	
									</div>
								</div>
								</div>
								<div className="col-xl-6 col-sm-12 col-lg-6 col-md-12 col-xs-12">
										<div className="title">Team Projects ({state.teamProjects.length})</div>
									<div className="inner-box height-section">
										<div className="row">
											{state.teamProjects.map(item => (
											<div className="col-xl-6 col-sm-12 col-lg-6 col-md-12 col-xs-12">
												<div className="card">
													<div className="card-body">
														<div className="box-view">
															
															
															{
																(item.productImage!=null) ?
																	<img className="thumbnail" src={config.IMG_URL+''+item.productImage} alt="" width="63px"  />
																:
																	<img className="thumbnail" src={homeImg} alt="" width="63px"  />
															 }
															 	
															
															
															<div className="right-sec">
																<div className="name">Project Name : {item.projectName} </div>
																<div className="status">Project Status : {`${item.projectStatus == 1 ? "Approved" :item.projectStatus == 2 ? "Unapproved" : item.projectStatus == 3 ? "Archived" : item.projectStatus == 4 ? "Active" : "Active"}`}</div>
																<div className="update">Last Update:  {item.modified}</div>
																
															</div>
														</div>
													</div>
												</div>
											</div>
											))}
										
										</div>
										
									</div>
									
								</div>
							</div>
						</div>
					
					</div>
				</div>
			</section>
			
		</div>
		</div>
		
        )
    }


export default TeamManager;