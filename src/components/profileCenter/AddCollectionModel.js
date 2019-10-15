import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";


import "./AddCollectionModel.scss";

export default class AddCollectionModel extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        onHide: PropTypes.func.isRequired
    };

    render() {
        const { show, onHide, workPublication } = this.props;
        console.log(workPublication);
        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
                size="lg"
                className="publication-modal modal"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <div className="header-title">Create Collection</div>
                </Modal.Header>
                <Modal.Body>
                    < div className="form-group">
                        <label>Recent Pieces</label>
                        <br />
                        {workPublication && workPublication.map(w => {
                            return <p>{w.publication_text}</p>
                        })}
                    </ div>
                </Modal.Body>
            </Modal>
        );
    }
}
