import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const AddTemplate = () => {
	const [state, setState] = useState({ show: false })

	const handleClose = () => {
		setState({ ...state, show: false });
	}

	const handleShow = () => {
		setState({ ...state, show: true });
	}



	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Launch demo modal
			</Button>

			<Modal show={state.show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}


export default AddTemplate;