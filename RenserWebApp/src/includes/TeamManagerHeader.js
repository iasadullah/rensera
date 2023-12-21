import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import homeImg from '../assets/images/home-img-01.d60eb4b9.png';
import axios from 'axios';
import { fetchAllTeam } from '../services/api';

const TeamManagerHeader = () => {
	const [state, setState] = useState({
		teamMemberName: '',
		teamId: '',
		teamName: '',
		teamModalshow: false,
		teamMemberModalshow: false,
		teams: []
	})

	const teamModalhandleClose = () => {
		setState({ ...state, teamModalshow: false });
	}

	const teamModalhandleShow = () => {
		setState({ ...state, teamModalshow: true });
	}

	const teamMemberModalhandleClose = () => {
		setState({ ...state, teamMemberModalshow: false });
	}

	const teamMemberModalhandleShow = () => {
		getAllTeam();
		setState({ ...state, teamMemberModalshow: true });
	}




	const myChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		setState({ ...state, [nam]: val });
	}

	const teamSubmitHandler = (event) => {
		// event.preventDefault();

		const self = this;
		let formData = new FormData();
		formData.append('teamName', state.teamName)
		if (state.teamName != '') {
			axios({
				method: 'post',
				url: 'http://localhost/rensera/services/saveTeam',
				data: formData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			})
				.then(function (response) {
					//handle success
					if (response.data.success == '1') {
						self.teamModalhandleClose();
						window.location.href = "/teammanager";
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
		formData.append('teamMemberName', state.teamMemberName)
		formData.append('teamId', state.teamId)

		if (state.teamMemberName != '' && state.teamId != '') {

			axios({
				method: 'post',
				url: 'http://localhost/rensera/services/saveTeamMember',
				data: formData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			})
				.then(function (response) {
					//handle success
					if (response.data.success == '1') {
						self.teamMemberModalhandleClose();
						window.location.href = "/teammanager";
					}
				})
				.catch(function (response) {
					//handle error
					console.log(response)
				});
		}
	}

	const getAllTeam = async () => {
		try {
			const result = await fetchAllTeam()
			setState({
				...state,
				teams: result
			});
		} catch (err) {

		}

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
			<Modal size="lg" show={state.teamMemberModalshow} onHide={teamMemberModalhandleClose}>

				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">ADD NEW MEMBER TO Team</h5>


						<button type="button" className="close" onClick={teamMemberModalhandleClose}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="col-xl-8 col-sm-12 col-lg-6 col-md-12 col-xs-12">

								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<label for="exampleFormControlInput1">New Team Member Name</label>
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
											<button type="submit" className="btn mb-2" onClick={mySubmitHandler}>Add New Team Member</button>
											<button type="submit" className="btn mb-2" onClick={teamMemberModalhandleClose}>Cancel</button>

										</div>
									</div>
								</div>

							</div>

						</div>
					</div>

				</div>

			</Modal>

			<Modal size="lg" show={state.teamModalshow} onHide={teamModalhandleClose}>

				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">ADD NEW TEAM</h5>


						<button type="button" className="close" onClick={teamModalhandleClose}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="col-xl-8 col-sm-12 col-lg-6 col-md-12 col-xs-12">

								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<label for="exampleFormControlInput1">New Team Name</label>
											<input type="text" className="form-control" name="teamName" onChange={myChangeHandler} value={state.teamName} />
										</div>
									</div>


									<div className="col-md-12">
										<div className="flex-box">
											<button type="submit" className="btn mb-2" onClick={teamSubmitHandler}>Add New Team</button>
											<button type="submit" className="btn mb-2" onClick={teamModalhandleClose}>Cancel</button>

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


export default TeamManagerHeader;