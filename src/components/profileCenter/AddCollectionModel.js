import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Card, Image } from "react-bootstrap";
import VideoThumbnail from '../generic/VideoThumbnail';

import "./AddCollectionModel.scss";
import { BASE_URL } from "../../app.constants";

export default class AddCollectionModel extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        onHide: PropTypes.func.isRequired
    };

    constructor() {
        super({});
        this.state = { postIds: [] };
    }

    addToCollection(id) {
        debugger;
        let postIds = this.state.postIds;
        if (this.getSelection(id)) {
            postIds = postIds.filter(w => w !== id);
        } else {
            postIds.push(id);
        }
        this.setState({ postIds });
    }

    getSelection(id) {
        return this.state.postIds.find(w => w === id) ? true : false;
    }

    getSelected() {        
        return this.props.workPublication.filter(w => this.state.postIds.indexOf(w.id) > -1);
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
                        <div className="col-md-12" style={{ maxHeight: "300px", overflow: "auto" }}>
                            {workPublication && workPublication.map(w => {
                                return <div className={"border col-md-3 float-left mb-2 mr-3 " +
                                    (this.getSelection(w.id) ? "border-info" : "")}
                                    style={{
                                        cursor: "pointer", minWidth: "184px", maxWidth: "184px",
                                        minHeight: "250px", maxHeight: "250px"
                                    }} onClick={() => { this.addToCollection(w.id); }}>

                                    <div style={{
                                        minHeight: "101px"
                                    }}>
                                        {w.publication_img === "1" &&
                                            <img className="pt-3" width="152" height="101" src={w.post} />}
                                        {w.publication_vid === "1" &&
                                            <VideoThumbnail className="content-card__video"
                                                src={BASE_URL + w.post} className="pt-3" width="152" height="101" />
                                        }
                                    </div>

                                    <br />
                                    <p dangerouslySetInnerHTML={{ __html: w.publication_text }}></p>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h3>Selected Pieces</h3>
                        <br />
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-12" style={{ maxHeight: "300px", overflow: "auto" }}>
                            {this.getSelected().map(w => {
                                return <div className={"border col-md-2 float-left mb-2 mr-3 border-info"}
                                    style={{
                                        cursor: "pointer", minWidth: "110px", maxWidth: "110px",
                                        minHeight: "150px", maxHeight: "150px"
                                    }}>

                                    <div >
                                        {w.publication_img === "1" &&
                                            <img className="pt-3" width="152" height="101" src={w.post} />}
                                        {w.publication_vid === "1" &&
                                            <VideoThumbnail className="content-card__video"
                                                src={BASE_URL + w.post} className="pt-3" width="152" height="101" />
                                        }
                                    </div>

                                    <br />
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
