import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Card, CardImg, Row, Container, Col, Form, Button, CardColumns } from "react-bootstrap";


import "./AddCollectionModel.scss";

export default class AddCollectionModel extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        onHide: PropTypes.func.isRequired
    };

    renderCards = () =>{
        const { show, onHide, workPublication } = this.props;
        let cards = {
            firstColumn : [],
            secondColumn : [],
            thirdColumn : [],
        }

        let i = 0;

        workPublication.filter((v) => (v.publication_type == 2)).map(w => {
            switch(i%3){
                case 0:{
                    cards['firstColumn'].push(
                        <Card  style={{ margin: '15px', textAlign: 'center',float:'left' }}>
                            <Form.Check className="checkbox" type="checkbox" />
                            <CardImg top width="60%" src='http://deveycon.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fc75768999fa25341695f1f66af2d43be9f47d8/index.jpg' alt="Card image cap" />
                            {/* <Card.Header><input type="checkbox" /></Card.Header> */}
                            <Card.Body className="bodycss" style={{maxWidth:'150px'}}>
                                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                <Card.Text dangerouslySetInnerHTML={{__html:w.publication_text}}/>
                                    {/* {w.publication_text} */}
                                {/* <Card.Footer><input type="checkbox" /></Card.Footer> */}
                                {/* <Button>Button</Button> */}
                            </Card.Body>
                        </Card>
                    );
                    break;
                }
                case 1:{

                    cards['secondColumn'].push(
                        <Card  style={{ margin: '15px', textAlign: 'center',float:'left' }}>
                            <Form.Check className="checkbox" type="checkbox" />
                            <CardImg top width="60%" src='http://deveycon.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fc75768999fa25341695f1f66af2d43be9f47d8/index.jpg' alt="Card image cap" />
                            {/* <Card.Header><input type="checkbox" /></Card.Header> */}
                            <Card.Body style={{maxWidth:'150px'}}>
                                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                <Card.Text dangerouslySetInnerHTML={{__html:w.publication_text}}/>
                                    {/* {w.publication_text} */}
                                {/* <Card.Footer><input type="checkbox" /></Card.Footer> */}
                                {/* <Button>Button</Button> */}
                            </Card.Body>
                        </Card>
                    );
                    break;

                }
                case 2:{

                    cards['thirdColumn'].push(
                        <Card  style={{ margin: '15px', textAlign: 'center',float:'left' }}>
                            <Form.Check className="checkbox" type="checkbox" />
                            <CardImg top width="60%" src='http://deveycon.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fc75768999fa25341695f1f66af2d43be9f47d8/index.jpg' alt="Card image cap" />
                            {/* <Card.Header><input type="checkbox" /></Card.Header> */}
                            <Card.Body style={{maxWidth:'150px'}}>
                                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                <Card.Text dangerouslySetInnerHTML={{__html:w.publication_text}}/>
                                    {/* {w.publication_text} */}
                                {/* <Card.Footer><input type="checkbox" /></Card.Footer> */}
                                {/* <Button>Button</Button> */}
                            </Card.Body>
                        </Card>
                    );
                    break;

                }
            }
            i++;
            
        });
        console.log(cards)
        return cards
    }

    render() {
        const { show, onHide, workPublication } = this.props;
        console.log(workPublication);
        let data = this.renderCards()
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
                                <Col>
                                    {data['firstColumn']}
                                </Col>
                                <Col>
                                    {data['secondColumn']}
                                </Col>
                                <Col>
                                    {data['thirdColumn']}
                                </Col>
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
