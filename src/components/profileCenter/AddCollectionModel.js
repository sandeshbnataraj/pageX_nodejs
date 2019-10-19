import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";


import "./AddCollectionModel.scss";

export default class AddCollectionModel extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        onHide: PropTypes.func.isRequired
    };

    constructor() {
        super({});
        this.state = { postId: -1 };
    }

    render() {
        const { show, onHide, workPublication } = this.props;
        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
                id="createCollectionModal"
                size="lg"
                className="publication-modal modal"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <div className="header-title">Create Collection</div>
                </Modal.Header>
                <Modal.Body className="p-3">

                    <div className="form-group">
                        <h3>Recent Pieces</h3>
                        <br />
                        <div className="col-md-12" style={{ maxHeight: "370px", overflow: "auto" }}>
                            {workPublication && workPublication.map(w => {
                                return <div className={"border col-md-3 float-left mb-2 mr-3 " + (w.id === this.state.postId ? "border-info" : "")}
                                    style={{ cursor: "pointer" }} onClick={() => { this.setState({ postId: w.id }) }}>
                                    <img className="pt-3" width="152" height="101" src={w.post} /><br />
                                    <p dangerouslySetInnerHTML={{ __html: w.publication_text }}></p>
                                </div>
                            })}
                        </div>
                    </ div>
                </Modal.Body>
                <Modal.Footer style={{ flexDirection: "initial" }}>
                    <button type="button" className="btn btn-primary">Create</button>
                </Modal.Footer>
            </Modal >
        );
    }
}
