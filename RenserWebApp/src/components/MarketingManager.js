import React  from 'react';
import { Link } from "react-router-dom";

import homeImg from '../assets/images/home-img-01.d60eb4b9.png';
import starIconImg from '../assets/images/star-icon.png';
import searchfileIconImg from '../assets/images/searchfile-icon.png';
import client1Img from '../assets/images/01.png';
import layout1Img from '../assets/images/layout-01.png';
import editImg from '../assets/images/edit-img.png';
import greenMapImg from '../assets/images/green-map-icon.png';
import puleAddImg from '../assets/images/pule-add-icon.png';
import renseraLogoImg from '../assets/images/rensera-logo.png';
import '../assets/js/jssor.slider-28.0.0.min.js';
import { Button,Modal,Tabs,Tab } from 'react-bootstrap';

const MarketingManager=()=>{
        return(
			<div>
            <header className="fixed-top">
			<div className="container-fluid">
				<div className="row">
					
					<div className="col-lg-12 col-sm-12 col-md-12">
						<nav className="navbar navbar-expand-lg navbar-light bg-light">
							<a className="navbar-brand" href="index.html">Product Name</a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
								
									<li className="nav-item">
										<a className="nav-link" href="javascript:void(0)" data-toggle="modal" data-target="#delete" > Send for Approval  <span className="sr-only">(current)</span></a>
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
		</header>
		<div className="wrapper">
			<section className="card-view marketing-section">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xl-2 col-sm-4 col-lg-2 col-md-4 col-xs-12 left-0">
							<div className="left-section-nav">

								<Tabs className="nav nav-tabs" defaultActiveKey="images" id="uncontrolled-tab-example">
									<Tab eventKey="images" title="Images">
									<div className="tab-pane fade show"  role="tabpanel" aria-labelledby="images-tab">
									<div className="form-group">
										<label for="exampleFormControlInput1">Search</label>
										<div className="searchbox">
											<input type="text" className="form-control" id="" placeholder="" />
											<i className="fa fa-search"></i>
										</div>
									</div>
									<div className="form-group">
										<select className="form-control ">
											<option>CLIENT IMAGES</option>
										</select>
									</div>
									<div className="img-box">
										<div className="row align-items-center">
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
											<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
												<a href="javascripr:void(0)"><img src={client1Img} /></a>
											</div>
										</div>
									</div>
								</div>
								
									</Tab>
									<Tab eventKey="content" title="Content">
									<div className="tab-pane " >
											<div className="searchbox">
												<input type="text" className="form-control" id="" placeholder="SEARCH CONTENT" />
												<i className="fa fa-search"></i>
											</div>
											<div className="space06"></div>
										<div className="accordion" id="accordionExample">
											<div className="card">
												<div className="card-header" id="headingOne">
													<h2 className="mb-0">
													<button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">LATIN AMERICA
													</button>
													</h2>
												</div>
												<div id="collapseOne" className="collapse space-m " aria-labelledby="headingOne" data-parent="#accordionExample">
													<div className="card-body">
														<div className="accordion" id="accordionExample">

															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-01-inner" aria-expanded="false" aria-controls="collapsepanel-01-inner">
																			Regional US Overview
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-01-inner" className="collapse" aria-labelledby="headingpanel-01-inner" data-parent="#collapsepanel-01-inner" >
																	<div className="card-body">
																		<ul>
																			<li>
																				- why Reniaw in the US ?
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-02-inner" aria-expanded="false" aria-controls="collapsepanel-02-inner">
																			Maps & Office List
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-02-inner" className="collapse " aria-labelledby="headingpanel-02-inner" data-parent="#collapsepanel-02-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Map of US
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Office List
																			<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-03-inner" aria-expanded="false" aria-controls="collapsepanel-03-inner">
																			Practice Groups
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-03-inner" className="collapse " aria-labelledby="headingpanel-03-inner" data-parent="#collapsepanel-03-inner">
																	<div className="card-body">
																	
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-04-inner" aria-expanded="false" aria-controls="collapsepanel-04-inner">
																			Corporate
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-04-inner" className="collapse " aria-labelledby="headingpanel-04-inner" data-parent="#collapsepanel-04-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-05-inner" aria-expanded="false" aria-controls="collapsepanel-05-inner">
																			Representative Experience
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-05-inner" className="collapse " aria-labelledby="headingpanel-05-inner" data-parent="#collapsepanel-05-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- M&A
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Private Equity
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Capital Markets
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-06-inner" aria-expanded="false" aria-controls="collapsepanel-06-inner">
																			Employment, Pensions...
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-06-inner" className="collapse " aria-labelledby="headingpanel-06-inner" data-parent="#collapsepanel-06-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-07-inner" aria-expanded="false" aria-controls="collapsepanel-07-inner">
																			Finance
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-07-inner" className="collapse " aria-labelledby="headingpanel-07-inner" data-parent="#collapsepanel-07-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-08-inner" aria-expanded="false" aria-controls="collapsepanel-08-inner">
																			Franchise
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-08-inner" className="collapse " aria-labelledby="headingpanel-08-inner" data-parent="#collapsepanel-08-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-09-inner" aria-expanded="false" aria-controls="collapsepanel-09-inner">
																			Litigation
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-09-inner" className="collapse " aria-labelledby="headingpanel-09-inner" data-parent="#collapsepanel-09-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-010-inner" aria-expanded="false" aria-controls="collapsepanel-010-inner">
																			Real Estate
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-010-inner" className="collapse " aria-labelledby="headingpanel-010-inner" data-parent="#collapsepanel-010-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left collapsed " type="button" data-toggle="collapse" data-target="#collapsepanel-011-inner" aria-expanded="false" aria-controls="collapsepanel-011-inner">
																			Regulatory and Govern...
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-011-inner" className="collapse " aria-labelledby="headingpanel-011-inner" data-parent="#collapsepanel-011-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
														</div>
													
													</div>
													
												</div>
											</div>
											<div className="card">
												<div className="card-header" id="headingTwo">
													<h2 className="mb-0">
													<button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
													UNITED STATES
													</button>
													</h2>
												</div>
												<div id="collapseTwo" className="collapse show space-m" aria-labelledby="headingTwo" data-parent="#accordionExample">
													<div className="card-body">
														<div className="accordion" id="accordionExample">
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-1-inner" aria-expanded="true" aria-controls="collapsepanel-1-inner">
																			Regional US Overview
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-1-inner" className="collapse show" aria-labelledby="headingpanel-1-inner" data-parent="#collapsepanel-1-inner" >
																	<div className="card-body">
																		<ul>
																			<li>
																				- why Reniaw in the US ?
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-2-inner" aria-expanded="true" aria-controls="collapsepanel-2-inner">
																			Maps & Office List
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-2-inner" className="collapse show" aria-labelledby="headingpanel-2-inner" data-parent="#collapsepanel-2-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Map of US
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Office List
																			<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-3-inner" aria-expanded="true" aria-controls="collapsepanel-3-inner">
																			Practice Groups
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-3-inner" className="collapse show" aria-labelledby="headingpanel-3-inner" data-parent="#collapsepanel-3-inner">
																	<div className="card-body">
																	
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-4-inner" aria-expanded="true" aria-controls="collapsepanel-4-inner">
																			Corporate
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-4-inner" className="collapse show" aria-labelledby="headingpanel-4-inner" data-parent="#collapsepanel-4-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-5-inner" aria-expanded="true" aria-controls="collapsepanel-5-inner">
																			Representative Experience
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-5-inner" className="collapse show" aria-labelledby="headingpanel-5-inner" data-parent="#collapsepanel-5-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- M&A
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Private Equity
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Capital Markets
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-6-inner" aria-expanded="true" aria-controls="collapsepanel-6-inner">
																			Employment, Pensions...
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-6-inner" className="collapse show" aria-labelledby="headingpanel-6-inner" data-parent="#collapsepanel-6-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-7-inner" aria-expanded="true" aria-controls="collapsepanel-7-inner">
																			Finance
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-7-inner" className="collapse show" aria-labelledby="headingpanel-7-inner" data-parent="#collapsepanel-7-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-8-inner" aria-expanded="true" aria-controls="collapsepanel-8-inner">
																			Franchise
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-8-inner" className="collapse show" aria-labelledby="headingpanel-8-inner" data-parent="#collapsepanel-8-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-9-inner" aria-expanded="true" aria-controls="collapsepanel-9-inner">
																			Litigation
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-9-inner" className="collapse show" aria-labelledby="headingpanel-9-inner" data-parent="#collapsepanel-9-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-10-inner" aria-expanded="true" aria-controls="collapsepanel-10-inner">
																			Real Estate
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-10-inner" className="collapse show" aria-labelledby="headingpanel-10-inner" data-parent="#collapsepanel-10-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																		</ul>
																	</div>
																</div>
															</div>
															<div className="card">
																<div className="card-header" id="headingOne">
																	<h2 className="mb-0">
																		<button className="btn btn-link btn-block text-left " type="button" data-toggle="collapse" data-target="#collapsepanel-11-inner" aria-expanded="true" aria-controls="collapsepanel-11-inner">
																			Regulatory and Govern...
																		</button>
																	</h2>
																</div>
																<div id="collapsepanel-11-inner" className="collapse show" aria-labelledby="headingpanel-11-inner" data-parent="#collapsepanel-11-inner">
																	<div className="card-body">
																		<ul>
																			<li>
																				- Overview
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
																			</li>
																			<li>
																				- Representative Experience
																				<a href="javascript:void(0)"><img src={searchfileIconImg} /></a>
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
									
									</Tab>
									<Tab eventKey="layouts" title="Layouts" >
									<div className="tab-pane " id="layout">
										<div className="img-box">
											<div className="row align-items-center">
												<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
													<a href="javascripr:void(0)"><img src={layout1Img} /></a>
												</div>
												<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
													<a href="javascripr:void(0)"><img src={layout1Img} /></a>
												</div>
												<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
													<a href="javascripr:void(0)"><img src={layout1Img} /></a>
												</div>
												<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
													<a href="javascripr:void(0)"><img src={layout1Img} /></a>
												</div>
												<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
													<a href="javascripr:void(0)"><img src={layout1Img} /></a>
												</div>
												<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
													<a href="javascripr:void(0)"><img src={layout1Img} /></a>
												</div>
												<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
													<a href="javascripr:void(0)"><img src={layout1Img} /></a>
												</div>
												<div className="col-xl-6  col-sm-6 col-lg-6 col-md-6 col-xs-12">
													<a href="javascripr:void(0)"><img src={layout1Img} /></a>
												</div>
												
											</div>
										</div>
									</div>
								
									</Tab>
								</Tabs>


								
								
							</div>
						</div>
						<div className="col-xl-8 col-sm-4 col-lg-8 col-md-8 col-xs-12">
							<div className="middle-section">
								
								<div className="inner-sec">
									<div className="row">
										<div className="col-xl-6 col-sm-6 col-lg-6 col-md-6 col-xs-12 border">
												<img src={editImg} />
												<div className="space"></div>
												<div className="box">
													<div className="row">
														<div className="col-xl-4 col-sm-12 col-lg-6 col-md-6 col-xs-12">
															<p className="blue">
																Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ut quidem eos dolorem ex iste eius et at repudiandae, praesentium asperiores sed assumenda inventore. Maxime quae facilis officiis voluptas beatae!
															</p>
														</div>
														<div className="col-xl-8 col-sm-12 col-lg-6 col-md-6 col-xs-12">
															<div className="title">M&A</div>
															<div className="row">
																<div className="col-xl-6 col-sm-12 col-lg-12 col-md-12 col-xs-12">
																	<p>
																		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero vel excepturi commodi ducimus repellendus sint quibusdam voluptatibus eius suscipit quos quaerat sunt ex consectetur sapiente nisi, cum, accusantium necessitatibus ab.
																	</p>
																</div>
																<div className="col-xl-6 col-sm-12 col-lg-12 col-md-12 col-xs-12">
																	<p>
																		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero vel excepturi commodi ducimus repellendus sint quibusdam voluptatibus eius suscipit quos quaerat sunt ex consectetur sapiente nisi, cum, accusantium necessitatibus ab.
																	</p>
																	<p>
																		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero vel excepturi commodi ducimus repellendus sint quibusdam voluptatibus eius suscipit quos quaerat sunt ex consectetur sapiente nisi, cum, accusantium necessitatibus ab.
																	</p>
																</div>
															</div>
															
														</div>
														
													</div>
												</div>
											
										</div>
										<div className="col-xl-6 col-sm-6 col-lg-6 col-md-6 col-xs-12">
											<p className="space"></p>
											<div className="box">
												<div className="row">
													<div className="col-xl-4 col-sm-12 col-lg-6 col-md-6 col-xs-12">
														<p>
															Lorem ipsum dolor sit amet consectetur, adipisicing, elit. Ipsa modi saepe placeat dolorum quod harum numquam aperiam voluptates totam eligendi iure, dolore tenetur, eum excepturi rem veniam nulla. Velit, earum?
														</p>
														<p className="blue">
															Lorem ipsum dolor sit, amet consectetur 
														</p>
														<p>
															Lorem ipsum dolor sit amet consectetur, adipisicing, elit. Ipsa modi saepe placeat dolorum quod harum numquam aperiam voluptates totam eligendi iure, dolore tenetur, eum excepturi rem veniam nulla. Velit, earum?
														</p>
														<p>
															Lorem ipsum dolor sit amet consectetur, adipisicing, elit. Ipsa modi saepe placeat dolorum quod harum numquam aperiam voluptates totam eligendi iure, dolore tenetur, eum excepturi rem veniam nulla. Velit, earum?
														</p>
													</div>
													<div className="col-xl-8 col-sm-12 col-lg-6 col-md-6 col-xs-12">
														<div className="row">
															<div className="col-xl-6 col-sm-12 col-lg-12 col-md-12 col-xs-12">
																<p className="blue">
																	Lorem ipsum dolor sit, amet consectetur 
																</p>
																<p>
																	Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero vel excepturi commodi ducimus repellendus sint quibusdam voluptatibus eius suscipit quos quaerat sunt ex consectetur sapiente nisi, cum, accusantium necessitatibus ab.
																</p>
																<p className="blue">
																<img src={greenMapImg} />
																	Lorem ipsum dolor sit, amet consectetur 
																</p>
																<p>
																	Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero vel excepturi commodi ducimus repellendus sint quibusdam voluptatibus eius suscipit quos quaerat sunt ex consectetur sapiente nisi, cum, accusantium necessitatibus ab.
																</p>
															</div>
															<div className="col-xl-6 col-sm-12 col-lg-12 col-md-12 col-xs-12">
																<div className="img-green-map">
																	<img className="img-m" src={greenMapImg} />
																</div>
																<div className="border-top"></div>
																<div className="blue-large">
																	<p>
																		Menditm nostiur magnisi dol orep udae nec tatur,
																		consedia culpa nis udamet, utem.<br />
																		Cae nobis volore vit ati ectur, con recabor itibus
																		molptas et maio.
																	</p>
																</div>
															</div>
														</div>
														
													</div>
													
												</div>
											</div>
											
										</div>
									</div>
								</div>
								<div className="bottom-section text-center">
									<img src={puleAddImg} />
								</div>
								<br />
							<div id="jssor_1" style={{position:"relative",margin:"0 auto",top:"0px",left:"0px",width:"980px",height:"120px",overflow:"hidden",visibility:"hidden"}}>
							  
							    <div data-u="loading" className="jssorl-009-spin" style={{position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%",textAlign:"center",backgroundColor:"rgba(0,0,0,0.7)"}}>
							        <img style={{marginTop:"-19px",position:"relative",top:"50%",width:"38px",height:"38px"}} src="images/spin.svg" />
							    </div>
							    <div className="img-view" data-u="slides" style={{cursor:"default",position:"relative",top:"0px",left:"0px",width:"980px",height:"100px",overflow:"hidden"}}>
							        <div>
							            <img data-u="image" src="images/031.jpg" />
							            <img data-u="thumb" src="images/slid-01.png" />
							        </div>
							        <div>
							            <img data-u="image" src="images/032.jpg" />
							            <img data-u="thumb" src="images/slid-02.png" />
							        </div>
							        <div>
							            <img data-u="image" src="images/033.jpg" />
							            <img data-u="thumb" src="images/slid-03.png" />
							        </div>
							        <div>
							            <img data-u="image" src="images/034.jpg" />
							            <img data-u="thumb" src="images/slid-04.png" />
							        </div>
							        <div>
							            <img data-u="image" src="images/035.jpg" />
							            <img data-u="thumb" src="images/slid-04.png" />
							        </div>
							        <div>
							            <img data-u="image" src="images/036.jpg" />
							            <img data-u="thumb" src="images/slid-04.png" />
							        </div>
							        <div>
							            <img data-u="image" src="images/037.jpg" />
							            <img data-u="thumb" src="images/slid-04.png" />
							        </div>
							        <div>
							            <img data-u="image" src="images/038.jpg" />
							            <img data-u="thumb" src="images/slid-04.png" />
							        </div>
							        <div>
							            <img data-u="image" src="images/039.jpg" />
							            <img data-u="thumb" src="images/slid-04.png" />
							        </div>
							        <div>
							            <img data-u="image" src="images/040.jpg" />
							            <img data-u="thumb" src="images/slid-04.png" />
							        </div>
							    </div>
							    <a data-scale="0" href="https://www.jssor.com" >web animation</a>
							    
							    <div data-u="thumbnavigator" className="jssort101" data-autocenter="1" data-scale-bottom="0.75">
							        <div data-u="slides">
							            <div data-u="prototype" className="p" >
							                <div data-u="thumbnailtemplate" className="t"></div>
							                <svg viewbox="0 0 16000 16000" className="cv">
							                    <circle className="a" cx="8000" cy="8000" r="3238.1"></circle>
							                    <line className="a" x1="6190.5" y1="8000" x2="9809.5" y2="8000"></line>
							                    <line className="a" x1="8000" y1="9809.5" x2="8000" y2="6190.5"></line>
							                </svg>
							            </div>
							        </div>
							    </div>
							    
							    <div data-u="arrowleft" className="jssora106"  data-scale="0.75">
							    	<img src="images/arrow-left-icon.svg"  />
							      
							    </div>
							    <div data-u="arrowright" className="jssora106"  data-scale="0.75">
							       
							        <img src="images/arrow-right-icon.svg"  />
							    </div>
							</div>
						


								

								<div className="clearfix"></div>
							</div>
						</div>
						<div className="col-xl-2 col-sm-4 col-lg-2 col-md-4 col-xs-12 right-0">
							<div className="right-section-nav">
								<div className="logo-section">
									<img src={renseraLogoImg} alt="logo" />
								</div>
								<div className="inner-section">
									<div className="title">Project Notes</div>
									<a href="javascript:void(0)" className="nor-btn">Show/Hide Note Pins</a>
									<a href="javascript:void(0)" className="nor-btn">Add New Note</a>
								<div className="accordion" id="accordionExample1">
								  <div className="card green-color ">
								    <div className="card-header" id="headingOne">
								      <h2 className="mb-0">
								        <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOneRight" aria-expanded="true" aria-controls="collapseOneRight">
								        <span>1</span>  In Progress
								        </button>
								      </h2>
								    </div>

								    <div id="collapseOneRight" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample1">
								      <div className="card-body">
								       
								        <p>
								        	<i>
								        		From Lawyer Name<br />
														Aug-15-2016 - 09:00 AM
								        	</i>
								        	Replace text with and bold speaker names: 
								        	The day-and-a-half program will begin with an evening reception and dinner with a keynote address by Admiral Michael S. Rogers, Commander, U.S. Cyber Command and Director, National Security Agency. The second day will feature a simulation, engaging on-stage  
								        </p>
								        <p>
								        	From You<br />
Aug-15-2016 - 10:22 AM
								        </p>
								        <p>
								        	Could not fit all the text from the note
								        </p>
								        <a className="nor-btn" href="javascript:void(0)">ADD / Update Note</a> <a href="javascript:void(0)"><i  className="fa fa-trash-o"></i></a>
								      </div>
								    </div>
								  </div>
								 <div className="card red-light">
								   <div className="card-header" id="headingTwo">
								     <h2 className="mb-0">
								       <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseTwoRight" aria-expanded="true" aria-controls="collapseTwoRight">
								        <span>2</span> REPLY
								       </button>
								     </h2>
								   </div>

								   <div id="collapseTwoRight" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample1">
								     <div className="card-body">
								       <p>
								        	<i>
								        		From Lawyer Name
								        		Aug-15-2016 - 09:00 AM
								        	</i>
								        	Replace text with and bold speaker names: <br />
								        	The day-and-a-half program will begin with an evening reception and dinner with a keynote address by Admiral Michael S. Rogers, Commander, U.S. Cyber Command and Director, National Security Agency. The second day will feature a simulation, engaging on-stage 
								        </p>
								        <p>
								        	From Marketing User Name
								        	Aug-15-2016 - 10:22 AM
								        </p>
								        <p>
								        	Por apera sitam, aut faccus, ipsam abore acepedi aut voluptatum qui sapiet doluptatem nem volo
								        </p>
								        <a className="nor-btn" href="javascript:void(0)">Reply</a> <a href="javascript:void(0)"><i  className="fa fa-trash-o"></i></a>
								     </div>
								   </div>
								 </div>
								  
								</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</section>
			
		
		<div className="modal fade" id="delete"  data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">Send Project For Approval</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<form action="">
							<div className="row">
								<div className="col-xl-12 col-sm-12 col-lg-12 col-md-12 col-xs-12">
									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label for="exampleFormControlInput1">Link to Project</label>
												<textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
											</div>
										</div>
										
										<div className="col-md-12">
											<div className="flex-box">
												<button type="submit" className="btn mb-2">Add New Template</button>
												<button type="submit" className="btn mb-2" data-dismiss="modal">Cancel</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
						</div>
						
					</div>
				</div>
			</div>
			
		</div>
		</div>
		
			



            )
        }
    

    
export default MarketingManager;        