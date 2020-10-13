import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";

function PageLoader(state) {
    return (
        <Modal show={state.loading} centered={true}>
            <div className="modal-body text-center">
                <div className="loader"></div>
                <div clas="loader-txt">
                    <p>Loading</p>
                </div>
            </div>
        </Modal>
    )
}

export default PageLoader