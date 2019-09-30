import React, { Component } from "react";
import Popup from "../../components/popup/popup";
import { ListGroupItem } from "react-bootstrap";
import { likePost, promotePost } from "../../actions/userPublicationAction";
class PublicationListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postIndex: 0,
      modalShow: false,
      likeCount: props.userPublication.likes,
      promoteCount: props.userPublication.promote,
      isLiked: false,
      isPromoted: false
    };
  }
  showPopup = () => {
    this.setState({ modalShow: true, postIndex: this.props.postIndex });
  };
  handleClose = () => {
    this.setState({ modalShow: false });
  };
  onPrevClick = () => {
    if (this.state.postIndex > 0) {
      this.setState({ postIndex: this.state.postIndex - 1 });
    }
  };
  onNextClick = () => {
    if (this.state.postIndex < this.props.userPublications.length - 1) {
      this.setState({ postIndex: this.state.postIndex + 1 });
    }

    if (this.state.postIndex === this.props.userPublications.length - 1) {
      this.handleClose();
    }
  };
  formatCount(count) {
    if (count) {
      if (count < 1000) {
        return count;
      } else if (count < 1000000) {
        return count / 1000 + "K";
      } else {
        return count / 1000000 + "M";
      }
    } else {
      return "";
    }
  }
  likePost = id => {
    this.setState({ likeCount: this.state.likeCount + 1 });
    likePost(id).then(
      res => {
        this.setState({ likeCount: res.data.count, isLiked: true });
      },
      () => {
        this.setState({ likeCount: this.state.likeCount - 1 });
      }
    );
  };
  promotePost = id => {
    this.setState({ promoteCount: this.state.promoteCount + 1 });
    promotePost(id).then(
      res => {
        this.setState({ promoteCount: res.data.count, isPromoted: true });
      },
      () => {
        this.setState({ promoteCount: this.state.promoteCount - 1 });
      }
    );
  };

  render() {
    const { index, userPublication, userPublications } = this.props;
    return (
      <div>
        <Popup
          show={this.state.modalShow}
          onHide={this.handleClose}
          onPrevClick={this.onPrevClick}
          onNextClick={this.onNextClick}
          userPublication={userPublications[this.state.postIndex]}
          likePost={this.likePost}
          promotePost={this.promotePost}
          likeCount={this.state.likeCount}
          promoteCount={this.state.promoteCount}
          isLiked={this.state.isLiked}
          isPromoted={this.state.isPromoted}
          formatCount={this.formatCount}
        />
        <ListGroupItem key={index} style={{ padding: "0.75rem 1rem" }}>
          <p>{userPublication.first_name + " " + userPublication.last_name} </p>
          <h6>
            <span
              className="text-info font-italic"
              onClick={() => {
                this.showPopup();
              }}
              style={{ fontSize: "12px", cursor: "pointer" }}
            >
              new post by
              <small style={{ fontSize: "15px", color: "black" }}>
                {" " + userPublication.first_name}
              </small>
            </span>
          </h6>
        </ListGroupItem>
      </div>
    );
  }
}

export default PublicationListItem;
