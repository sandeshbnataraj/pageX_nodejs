import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Card, CardImg, Row, Container, Col, Form, Button } from "react-bootstrap";


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
                        <h3>Post Collection</h3>
                        <br />
                        <h3>Recent Pieces</h3>
                        <br />
                        <div className="col-md-12" style={{ maxHeight: "370px", overflow: "auto" }}>
                            {workPublication && workPublication.map(w => {
                                return <div className="border col-md-3 float-left mb-2 mr-3">
                                    <input type="checkbox" />
                                    <img width="250" height="250" src={w.post} /><br />
                                    <p>{w.publication_text}</p>
                                </div>
                            })}
                        </div>
                    </ div>


                    < div className="form-group">
                        <Container style={{ borderBottom: '2px solid #eee' }}>
                            <label>Recent Pieces</label>
                            <br />
                            <Row className='centerise-row scroll'>
                                {workPublication && workPublication.filter((v) => (v.publication_type == 2)).map(w => {
                                    return <Col md xs lg="4">
                                                <Card style={{ margin: '15px', textAlign: 'center',float:'left' }}>
                                                    <Form.Check className="checkbox" type="checkbox" />
                                                    <CardImg top width="60%" src='http://deveycon.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fc75768999fa25341695f1f66af2d43be9f47d8/index.jpg' alt="Card image cap" />
                                                    {/* <Card.Header><input type="checkbox" /></Card.Header> */}
                                                    <Card.Body>
                                                        {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                                        <Card.Text dangerouslySetInnerHTML={{__html:w.publication_text}}/>
                                                            {/* {w.publication_text} */}
                                                        {/* <Card.Footer><input type="checkbox" /></Card.Footer> */}
                                                        {/* <Button>Button</Button> */}
                                                    </Card.Body>
                                                </Card>
                                            </Col>

                                    //  <p>{w.publication_text}</p>
                                })}
                            </Row>
                        </Container>
                    </ div>
                </Modal.Body>
                <Modal.Footer style={{ flexDirection: "initial" }}>
                    <button type="button" class="btn btn-primary">Create</button>
                </Modal.Footer>
            </Modal >
        );
    }
}
