import React, { Component } from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import ContentCard from "../content-card/content-card";
import "./profileCenter.scss";
import isEqual from "lodash/isEqual";
import { BASE_URL } from "../../app.constants";

export default class ProfileCenter extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: "updates",
      workPublication: [],
      updatedPublication: [],
      coverPicChanged: false,
      coverpic: "",
      coverpicView: "",
      loading: false
    };
    this.getUpdates = this.getUpdates.bind(this);
    this.getWorks = this.getWorks.bind(this);
    this.onFileUploadCoverPic = this.onFileUploadCoverPic.bind(this);
    this.initProfilePic = this.initProfilePic.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }
  componentDidMount() {
    this.setState({ workPublication: this.getWorks() });
    this.setState({ updatedPublication: this.getUpdates() });
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps, this.props)) {
      this.setState({ workPublication: this.getWorks() });
      this.setState({ updatedPublication: this.getUpdates() });
      this.initProfilePic();
    }
  }
  getWorks() {
    return this.props.userPublications.filter(
      publication => publication.publication_type === "2"
    );
  }
  getUpdates() {
    return this.props.userPublications.filter(
      publication => publication.publication_type === "1"
    );
  }
  initProfilePic() {
    const user = this.props.user ? this.props.user[0] : undefined;
    if (user)
      this.setState({
        coverpicView: BASE_URL + user.coverpic,
        coverPicChanged: false
      });
  }
  onFileUploadCoverPic(e) {
    if (!e.target.files.length) {
      return;
    }
    const attachment = Array.from(e.target.files)[0];
    this.setState({ coverpic: attachment, coverPicChanged: true });
    this.loadImage(attachment);
  }
  loadImage(attachment) {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ coverpicView: e.target.result });
    };
    reader.readAsDataURL(attachment);
  }
  editProfile() {
    this.setState({ coverPicChanged: false });
    this.props.editProfile({ coverpic: this.state.coverpic });
  }
  render() {
    return (
      <div className="right">
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.selectedTab}
          onSelect={key => this.setState({ selectedTab: key })}
        >
          <Tab eventKey="updates" title="Updates" unmountOnExit={true}>
            {this.state.updatedPublication.map((userPublication, index) => (
              <ContentCard
                key={index}
                postIndex={index}
                userPublication={userPublication}
                userPublications={this.props.userPublications}
              />
            ))}
          </Tab>
          <Tab eventKey="works" title="Works" unmountOnExit={true}>
            {this.state.workPublication.map((userPublication, index) => (
              <ContentCard
                key={index}
                postIndex={index}
                userPublication={userPublication}
                userPublications={this.props.userPublications}
              />
            ))}
          </Tab>
          <Tab eventKey="audience" title="Audience" unmountOnExit={true}>
            <div>Audience</div>
          </Tab>
        </Tabs>

        {this.props.loading && (
          <div className="mt-3 font-weight-bold">
            <Alert variant="light">
              <Spinner animation="grow" size="sm" /> Loading...
            </Alert>
          </div>
        )}
      </div>
    );
  }
}
