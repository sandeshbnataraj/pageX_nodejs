import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Card, CardImg, Row, Container, Dropdown, Form, Button } from "react-bootstrap";


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
                    {/* <Card style={{ border: 'none' }}>
                        POST
                    </Card>
                    <Row>
                    </Row> */}

                    < div className="form-group">
                        <Container style={{ borderBottom: '2px solid #eee' }}>
                            <label>Post Collection</label>
                            <br />
                            <Row className='centerise-row'>
                                <Card style={{ margin: '10px', textAlign: 'center' }}>
                                    <Card.Body>Dummy</Card.Body>
                                </Card>
                            </Row>
                        </Container>
                    </ div>


                    < div className="form-group">
                        <Container style={{ borderBottom: '2px solid #eee' }}>
                            <label>Recent Pieces</label>
                            <br />
                            <Row className='centerise-row scroll'>
                                {workPublication && workPublication.filter((v) => (v.publication_type == 2)).map(w => {
                                    return <Card style={{ margin: '10px', textAlign: 'center' }}>

                                        <CardImg top width="60%" src='http://deveycon.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fc75768999fa25341695f1f66af2d43be9f47d8/index.jpg' alt="Card image cap" />
                                        {/* <Card.Header><input type="checkbox" /></Card.Header> */}
                                        <Card.Body>
                                            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                            <Card.Text>{w.publication_text} &nbsp; &nbsp;<input type="checkbox" /></Card.Text>
                                            {/* <Card.Footer><input type="checkbox" /></Card.Footer> */}
                                            {/* <Button>Button</Button> */}
                                        </Card.Body>
                                    </Card>

                                    //  <p>{w.publication_text}</p>
                                })}
                            </Row>
                        </Container>
                    </ div>

                    < div className="form-group">
                        <Container style={{ borderBottom: '2px solid #eee' }}>
                            {/* <label>Post Collection</label> */}
                            {/* <br /> */}
                            <Row className='centerise-row'>
                                <Card style={{ margin: '10px', textAlign: 'center' }}>
                                    <Card.Body>Dummy</Card.Body>
                                </Card>
                                <Card style={{ margin: '10px', textAlign: 'center' }}>
                                    <Card.Body>Dummy</Card.Body>
                                </Card>
                                <Card style={{ margin: '10px', textAlign: 'center' }}>
                                    <Card.Body>Dummy</Card.Body>
                                </Card>
                            </Row>
                        </Container>
                    </ div>


                </Modal.Body>
                <Modal.Footer style={{ alignItems: "flex-end" }}>
                    <Button variant="primary">Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
