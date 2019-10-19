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
        this.state = { postId: -1 };
    }

    render() {
        const { show, onHide, workPublication } = this.props;
        const selectedworkPublication = workPublication.find(w => w.id === this.state.postId);
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
                                    (w.id === this.state.postId ? "border-info" : "")}
                                    style={{
                                        cursor: "pointer", minWidth: "184px", maxWidth: "184px",
                                        minHeight: "250px", maxHeight: "250px"
                                    }} onClick={() => { this.setState({ postId: w.id }) }}>

                                    <div style={{
                                        minHeight: "101px"
                                    }}>
                                        {w.publication_img === "1" && w.publication_vid === "0" &&
                                            <img className="pt-3" width="152" height="101" src={w.post} />}
                                        {w.publication_img === "0" && w.publication_vid === "1" &&
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
                    {this.state.postId > 0 && selectedworkPublication && <div className="col-md-12">
                        <div className="form-group">

                            <Card.Body style={{ padding: '1rem 0' }}>
                                {selectedworkPublication && selectedworkPublication.publication_subject && (
                                    <p className="content-card__text">
                                        {selectedworkPublication.publication_subject}
                                    </p>
                                )}
                                {selectedworkPublication && selectedworkPublication.publication_text && (
                                    <p className="content-card__text" dangerouslySetInnerHTML={{ __html: selectedworkPublication.publication_text }}>
                                    </p>
                                )}
                                {selectedworkPublication && selectedworkPublication.publication_img === '1' &&
                                    <Image className="content-card__image" src={BASE_URL + selectedworkPublication.post} />
                                }

                                {selectedworkPublication && selectedworkPublication.publication_vid === '1' && (
                                    <VideoThumbnail className="content-card__video" src={BASE_URL + selectedworkPublication.post} />
                                )}
                            </Card.Body>
                        </div>

                    </ div>}

                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" />
                    </div>

                </Modal.Body>
                <Modal.Footer style={{ flexDirection: "initial" }}>
                    <button type="button" className="btn btn-primary">Create</button>
                </Modal.Footer>
            </Modal >
        );
    }
}
