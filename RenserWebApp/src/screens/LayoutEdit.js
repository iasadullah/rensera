import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import '../assets/css/style.css';
import darkLogo from '../assets/images/rensera_dark.png';
import '../assets/css/font-awesome.min.css';
import WebViewer from '@pdftron/webviewer';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Iframe from 'react-iframe';
import { Helmet } from "react-helmet";
import dateFormat from 'dateformat';
import $ from 'jquery'
import config from '../includes/config';
import { fetchllProjectNotes, onDeleteProjectNote } from '../services/api';

const LayoutEdit = (props) => {
	
	const [state, setState] = useState({
		noteTitle: '',
		noteDescription: '',
		projectId: '',
		noteId: '',
		replyComment: '',
		notes: [],
		noteModalshow: false,
		replyModalshow: false,
	})

	useEffect(() => {
		if (props.location.templatesProps === undefined) {

		} else {
			localStorage.setItem('projectId', props.location.templatesProps.projectId);

		}


		setState({
			...state,
			projectId: localStorage.getItem('projectId')
		});


		getAllProjectNotes();
	}, [])

	const noteModalhandleClose = () => {
		setState({ ...state, noteModalshow: false, noteTitle: '', noteDescription: '' });
	}

	const noteModalhandleShow = () => {
		setState({ ...state, noteModalshow: true });
	}

	const replyModalhandleClose = () => {
		setState({ ...state, replyModalshow: false, replyComment: '', noteId: '' });
	}


	const replyModalhandleShow = (noteId) => {
		setState({ ...state, replyModalshow: true, noteId: noteId });

	}



	const myChangeHandler = (event) => {

		let nam = event.target.name;
		let val = event.target.value;
		setState({ ...state, [nam]: val });

		console.log(state);
	}
	const mySubmitHandler = (event) => {
		event.preventDefault();
		let formData = new FormData();
		formData.append('noteTitle', state.noteTitle)
		formData.append('noteDescription', state.noteDescription)
		formData.append('projectId', state.projectId)

		if (state.noteTitle != '' && state.projectId != '') {

			axios({
				method: 'post',
				url: config.API_URL + 'saveProjectNotes',
				data: formData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			})
				.then(function (response) {
					//handle success
					if (response.data.success == '1') {
						setState({ ...state, noteTitle: '', noteDescription: '', });
						noteModalhandleClose();
						getAllProjectNotes();
					}
				})
				.catch(function (response) {
					console.log(response)
				});
		}
	}


	const replySubmitHandler = (event) => {
		event.preventDefault();

		let formData = new FormData();
		formData.append('replyComment', state.replyComment)
		formData.append('noteId', state.noteId)

		if (state.replyComment != '' && state.noteId != '') {

			axios({
				method: 'post',
				url: config.API_URL + 'saveProjectNoteComments',
				data: formData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			})
				.then(function (response) {
					//handle success
					if (response.data.success == '1') {
						setState({ ...state, replyComment: '', noteId: '', });
						replyModalhandleClose();
						getAllProjectNotes();
					}
				})
				.catch(function (response) {
					console.log(response)
				});
		}
	}


	const getAllProjectNotes = async () => {
		try {
			const result = await fetchllProjectNotes(localStorage.getItem('projectId'))
			setState({
				...state,
				notes: result
			});
		} catch (err) {

		}


	}

	const deleteNoteHandler = async (noteId) => {
		try {
			await onDeleteProjectNote(noteId)
			getAllProjectNotes();
			console.log('Deleted Successfully.');
		} catch (err) {

		}

	}

	const showHideNotesPinHandel = () => {
		$('.accordion button').click();
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
											<a className="nav-link" href="javascript:void(0)" > Send for Approval  <span className="sr-only">(current)</span></a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="javascript:void(0)"> Approve </a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="javascript:void(0)" >  Save </a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="javascript:void(0)"> Preview  </a>
										</li>
									</ul>

								</div>
							</nav>
						</div>
					</div>
				</div>
				<Modal size="lg" id="create-new" show={state.noteModalshow} onHide={noteModalhandleClose}>

					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">ADD NEW NOTE</h5>


							<button type="button" className="close" onClick={noteModalhandleClose}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-xl-12 col-sm-12 col-lg-6 col-md-12 col-xs-12">

									<div className="row">
										<div className="col-md-12">
											<div className="form-group">

												<input type="text" className="form-control" name="noteTitle" onChange={myChangeHandler} placeholder="Title" value={state.noteTitle} autocomplete="off" />
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-group">

												<textarea className="form-control" rows="6" name="noteDescription" placeholder="Description" onChange={myChangeHandler}>{state.noteDescription}</textarea>
											</div>
										</div>


										<div className="col-md-12">
											<div className="flex-box">

												<button type="submit" className="btn mb-2" onClick={mySubmitHandler}>Add Note</button>
												<button type="submit" className="btn mb-2" onClick={noteModalhandleClose}>Cancel</button>

											</div>
										</div>
									</div>

								</div>

							</div>
						</div>

					</div>

				</Modal>

				<Modal size="lg" id="create-new" show={state.replyModalshow} onHide={replyModalhandleClose}>

					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">ADD NOTE REPLY</h5>


							<button type="button" className="close" onClick={replyModalhandleClose}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-xl-12 col-sm-12 col-lg-6 col-md-12 col-xs-12">

									<div className="row">
										<div className="col-md-12">
											<div className="form-group">

												<textarea className="form-control" rows="6" name="replyComment" placeholder="Reply" onChange={myChangeHandler}>{state.replyComment}</textarea>
											</div>
										</div>


										<div className="col-md-12">
											<div className="flex-box">

												<button type="submit" className="btn mb-2" onClick={replySubmitHandler}>Add Reply</button>
												<button type="submit" className="btn mb-2" onClick={replyModalhandleClose}>Cancel</button>

											</div>
										</div>
									</div>

								</div>

							</div>
						</div>

					</div>

				</Modal>

			</header>
			<div className="wrapper" style={{ padding: "43px 0px 0px !important" }}>
				<section className="card-view marketing-section layoutedit">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xl-10 col-sm-4 col-lg-10 col-md-10 col-xs-12">
								<div className="webviewer" style={{ height: "100vh" }}>
									<Iframe url="https://webapp.printui.com/editor/d001/index.html?client=perimark&amp;jobID=Rensera_Pitch_Brochure_Mock_up\Rensera_Pitch_Brochure_Mock_up8.5x11-1624602003-60d575dcbff27407898695&amp;locale=en_US&amp;cancelLabel=CANCEL&amp;cancelAlert=Are%20you%20sure%3F&amp;cancelPath&amp;finishedButtonLabel=FINISHED&amp;autoSaveInterval=300&amp;showSocialGalleries=db,fb"
										width="100%"
										height="100%"
										id="myId"
										className="myClassname"
										display="initial"
										position="relative" />
								</div>
							</div>
							<div className="col-xl-2 col-sm-4 col-lg-2 col-md-4 col-xs-12 right-0">
								<div className="right-section-nav">

									<div className="inner-section">
										<div className="title">Project Notes</div>
										<a href="javascript:void(0)" className="nor-btn" onClick={showHideNotesPinHandel}>Show/Hide Note Pins</a>
										<a href="javascript:void(0)" className="nor-btn" onClick={noteModalhandleShow}>Add New Note</a>
										<div className="accordion" id="accordionExample1">
											{state.notes.map((item, key) =>

												<div className={`${key % 2 === 0 ? "card red-light" : "card green-color"}`}>
													<div className="card-header" id="headingOne">
														<h2 className="mb-0">
															<button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={"#collapse" + key} aria-expanded="true" aria-controls={"collapse" + key}>
																<span>{key + 1}</span>  {item.title}
															</button>
														</h2>
													</div>

													<div id={"collapse" + key} className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample1">
														<div className="card-body">

															<p>
																<i>
																	From Lawyer Name
																	Aug-15-2016 - 09:00 AM
																</i>
																{item.description}
															</p>
															{item.comments.map((comment, k) =>
																<p>
																	<p>
																		From Reply User Name
																		<div>{comment.modified}</div>
																	</p>
																	<p>
																		{comment.comments}
																	</p>
																</p>
															)}

															<a className="nor-btn" href="javascript:void(0)" onClick={() => { replyModalhandleShow(item.noteId) }}>Reply</a>
															<a href="javascript:void(0)" onClick={() => { if (window.confirm('Are you sure to delete this record?')) { deleteNoteHandler(item.noteId) }; }}>
																<i className="fa fa-trash-o"></i>
															</a>
														</div>
													</div>
												</div>



											)}



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



export default LayoutEdit;