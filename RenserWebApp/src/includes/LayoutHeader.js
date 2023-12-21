import React from 'react';
import { Link } from "react-router-dom";


const LayoutHeader = () => {


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


	);

}



export default LayoutHeader;