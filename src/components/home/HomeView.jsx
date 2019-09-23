import React from "react";
import { Alert, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCard from "../content-card/content-card";
import Left from "../left/left";
import Publication from "../publication/Publication";
import { Link } from "react-router-dom";
import queryString from "query-string";
import "./home.scss";

export default class HomeView extends React.Component {
  render() {
    return (
      <section
        style={{
          backgroundColor: "#F5FAFE",
          paddingBottom: "2rem",
          paddingTop: "1rem"
        }}
      >
        {" "}
        {/** TODO: extract styles to scss */}
        <Container className="content">
          <Row>
            <Col md={2}>
              <Left from="home" user={this.props.userInfo.user} />
            </Col>
            <Col md={6}>
              <Publication publicationType="update" />
              {this.props.userPublications.map((userPublication, index) => (
                <ContentCard
                  key={index}
                  postIndex={index}
                  userPublication={userPublication}
                  userPublications={this.props.userPublications}
                  loadMoreData={this.loadMoreData}
                />
              ))}

              {this.props.loading && (
                <div className="mt-3 font-weight-bold">
                  <Alert variant="light">
                    <Spinner animation="grow" size="sm" /> Loading...
                  </Alert>
                </div>
              )}
            </Col>
            <Col md={3}>
              <aside className="members shadow p-3 mb-5">
                <h6 className="members__title">Influential members</h6>
                <div className="members__container">
                  {this.props.influencers &&
                    this.props.influencers.map((value, index) => {
                      return (
                        <Row key={index}>
                          <Col
                            md={3}
                            className="member d-flex flex-row align-items-start "
                          >
                            <figure className="">
                              <Image
                                src={
                                  value.avatar
                                    ? value.avatar
                                    : "https://via.placeholder.com/150"
                                }
                                className="member-img"
                              />
                            </figure>
                          </Col>
                          <Col md={9}>
                            <div>
                              <h6 className="member__username">
                                <Link
                                  to={{
                                    pathname: "/profile/",
                                    search: queryString.stringify(
                                      Object.assign({}, { user_id: value.id })
                                    ),
                                    state: { currentuser: false }
                                  }}
                                >
                                  <small className="member-caption">
                                    {value.first_name + " " + value.last_name}
                                  </small>
                                </Link>
                              </h6>

                              <p className="member-caption">
                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  className="mr-1"
                                />
                                {value.email}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      );
                    })}
                </div>
              </aside>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
