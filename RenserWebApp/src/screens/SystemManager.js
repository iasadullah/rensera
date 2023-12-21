import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import darkLogo from '../assets/images/rensera_dark.png';
import '../assets/css/style.css';
import '../assets/css/font-awesome.min.css';
import dateFormat from 'dateformat';
import $ from 'jquery'
import axios from 'axios';
import config from '../includes/config';
import { fetchAllOffices, fetchAllLeadPracticeGroups, onDeleteOffice, onDeleteLeadPracticeGroup, fetchOfficeDataById, fetchLeadPracticeGroupDataById } from '../services/api';

const SystemManager = () => {
	const [state, setState] = useState({
		officePopupType: 'Add',
		groupPopupType: 'Add',
		officeId: '',
		officeName: '',
		officeAddress: '',
		groupId: '',
		leadPracticeGroupName: '',
		officeModalshow: false,
		leadPracticeModalshow: false,
		offices: [],
		leadPracticeGroups: []
	})

	useEffect(() => {
		getAllOffice();
		getAllLeadPracticeGroup();
	}, [])

	const officeModalhandleClose = () => {
		setState({ ...state, officeModalshow: false, officeName: '', officeAddress: '', officeId: '', officePopupType: 'Add' });
	}

	const officeModalhandleShow = () => {
		setState({ ...state, officeModalshow: true });
	}

	const leadPracticeModalhandleClose = () => {
		setState({ ...state, leadPracticeModalshow: false, leadPracticeGroupName: '', groupId: '', groupPopupType: 'Add' });
	}

	const leadPracticeModalhandleShow = () => {
		setState({ ...state, leadPracticeModalshow: true });
	}

	const myChangeHandler = (event) => {

		let nam = event.target.name;
		let val = event.target.value;
		setState({ ...state, [nam]: val });

		console.log(state);
	}

	const leadPracticeSubmitHandler = (event) => {
		// event.preventDefault();

		const self = this;
		let formData = new FormData();
		formData.append('leadPracticeGroupName', state.leadPracticeGroupName)
		formData.append('groupId', state.groupId)
		if (state.leadPracticeGroupName != '') {
			axios({
				method: 'post',
				url: config.API_URL + 'saveLeadPracticeGroup',
				data: formData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			})
				.then(function (response) {
					//handle success
					if (response.data.success == '1') {
						setState({ ...state, leadPracticeGroupName: '', groupId: '', groupPopupType: 'Add' });
						leadPracticeModalhandleClose();
						getAllLeadPracticeGroup();
					}
				})
				.catch(function (response) {
					//handle error
					console.log(response)
				});
		}
	}


	const mySubmitHandler = (event) => {
		// event.preventDefault();

		const self = this;
		let formData = new FormData();
		formData.append('officeName', state.officeName)
		formData.append('officeAddress', state.officeAddress)
		formData.append('officeId', state.officeId)
		if (state.officeName != '') {

			axios({
				method: 'post',
				url: config.API_URL + 'saveOffice',
				data: formData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			})
				.then(function (response) {
					//handle success
					if (response.data.success == '1') {
						setState({ ...state, officeName: '', officeAddress: '', officeId: '', officePopupType: 'Add' });
						officeModalhandleClose();
						getAllOffice();
					}
				})
				.catch(function (response) {
					//handle error
					console.log(response)
				});
		}
	}







	const getAllOffice = async () => {
		try {
			const result = await fetchAllOffices()
			setState({
				...state,
				offices: result
			});
		} catch (err) {

		}

	}

	const getAllLeadPracticeGroup = async () => {
		try {
			const result = await fetchAllLeadPracticeGroups()
			setState({
				...state,
				leadPracticeGroups: result
			});

		} catch (err) {

		}

	}




	const deleteHandler = async (officeId) => {
		try {
			await onDeleteOffice(officeId)
			getAllOffice();
			console.log('Deleted Successfully.');
		} catch (err) {

		}

	}

	const deleteLeadPracticeGroupHandler = async (groupId) => {
		try {
			await onDeleteLeadPracticeGroup(groupId)
			getAllLeadPracticeGroup();
			console.log('Deleted Successfully.');
		} catch (err) {

		}

	}

	const officeEditHandler = async (officeId) => {
		try {
			const result = await fetchOfficeDataById(officeId)
			setState({
				...state,
				officeName: result.officeName,
				officeAddress: result.officeAddress,
				officeId: result.officeId,
				officePopupType: 'Update',

			});

			officeModalhandleShow();
			console.log(result);
		} catch (err) {

		}

	}

	const leadPracticeGroupEditHandler = async (groupId) => {
		try {
			const result = await fetchLeadPracticeGroupDataById(groupId)
			setState({
				...state,
				leadPracticeGroupName: result.leadPracticeGroupName,
				groupId: result.groupId,
				groupPopupType: 'Update',
			});

			leadPracticeModalhandleShow();
			console.log(result);
		} catch (err) {

		}

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
				<Modal size="sm" id="create-new" show={state.officeModalshow} onHide={officeModalhandleClose}>

					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">{state.officePopupType} New Office</h5>


							<button type="button" className="close" onClick={officeModalhandleClose}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-xl-12 col-sm-12 col-lg-6 col-md-12 col-xs-12">

									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label for="exampleFormControlInput1">Office Name</label>
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
												<input type="hidden" name="officeId" value={state.officeId} />
												<button type="submit" className="btn mb-2" onClick={mySubmitHandler}>{state.officePopupType} New Office</button>
												<button type="submit" className="btn mb-2" onClick={officeModalhandleClose}>Cancel</button>

											</div>
										</div>
									</div>

								</div>

							</div>
						</div>

					</div>

				</Modal>

				<Modal size="sm" id="create-new" show={state.leadPracticeModalshow} onHide={leadPracticeModalhandleClose}>

					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">{state.groupPopupType} New Lead Practice Group</h5>


							<button type="button" className="close" onClick={leadPracticeModalhandleClose}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-xl-12 col-sm-12 col-lg-6 col-md-12 col-xs-12">

									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label for="exampleFormControlInput1">Lead Practice Group Name</label>
												<input type="text" className="form-control" name="leadPracticeGroupName" onChange={myChangeHandler} value={state.leadPracticeGroupName} />
											</div>
										</div>


										<div className="col-md-12">
											<div className="flex-box">
												<input type="hidden" name="groupId" value={state.groupId} />
												<button type="submit" className="btn mb-2" onClick={leadPracticeSubmitHandler}>{state.groupPopupType} New Group</button>
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
			<div class="wrapper">
				<section class="systm-manager-section">
					<div class="container-fluid">
						<div class="row">
							<div class="col-xl-4 col-sm-12 col-lg-4 col-md-4 col-xs-12">
								<div class="title">General System Settings</div>
								<div class="inner">
									Auto save Timer (Seconds) <input class="form-control" type="text" name="" placeholder="300" />
									<div class="clearfix"></div>
									<a href="javascript:void(0)" class="btn mt-05">Update System Settings</a>
									<div class="title">General System Settings</div>
									<a href="javascript:void(0)" class="btn mt-05">Create System Report</a>
								</div>
							</div>
							<div class="col-xl-4 col-sm-12 col-lg-4 col-md-4 col-xs-12">
								<div class="title">Lead Practice Group</div>
								<div class="card">
									<div class="card-body">
										<ul class="group">
											{state.leadPracticeGroups.map(gitem => (
												<li>
													<b>{gitem.leadPracticeGroupName}</b>
													<a href="javascript:void(0)" onClick={() => { if (window.confirm('Are you sure to delete this record?')) { deleteLeadPracticeGroupHandler(gitem.groupId) }; }} title="delete">
														<i class="fa fa-trash-o"></i>
													</a>
													<a href="javascript:void(0)" onClick={() => { leadPracticeGroupEditHandler(gitem.groupId) }} title="edit">
														<i class="fa fa-pencil-square-o"></i>
													</a>
												</li>

											))}
										</ul>

									</div>
								</div>
							</div>
							<div class="col-xl-4 col-sm-12 col-lg-4 col-md-4 col-xs-12">
								<div class="title">Office</div>
								<div class="card">
									<div class="card-body">
										{state.offices.map(item => (
											<ul class="group-view">
												<li>
													<b>{item.officeName}</b>
													{item.officeAddress}
												</li>
												<li>
													<a href="javascript:void(0)" onClick={() => { if (window.confirm('Are you sure to delete this record?')) { deleteHandler(item.officeId) }; }} title="delete"><i class="fa fa-trash-o"></i></a>
													<a href="javascript:void(0)" onClick={() => { officeEditHandler(item.officeId) }} title="edit"><i class="fa fa-pencil-square-o"></i></a>
												</li>

											</ul>
										))}
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



export default SystemManager;        