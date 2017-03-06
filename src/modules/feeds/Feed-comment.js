import React, { Component } from 'react';
import moment from 'moment';
import request from '../request/Request';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        text: 'Comment...'
    };

    this.message = null;
    this.type = null;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    let data = {
        "text": this.state.text,
        "person": {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName
        }
    }
    request({
        POST: `https://inloop-webproject.herokuapp.com/api/feeds/${this.props.feed_id}/comments`,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(data => {
        this.message = "Commet was successfully saved";
        this.type = "success";
    }).catch(error => {
        this.message = "Error in saving comment. Please repeat action.";
        this.type = "danger";
    });
  }

  closeInfo(name) {
    this.message = null;
  }

  render() {

    let requestInfo = null;
    if (this.message) {
        requestInfo = ( 
            <div className="row">
                <div className="alert alert-success" role="alert">
                <button type="button" className="close" aria-label="Close" onClick={this.closeInfo(this.type)}>
                    <span aria-hidden="true">×</span>
                </button>
                {this.message}
                </div> 
            </div>
        );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {requestInfo}
        <div className="form-group">
            <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" />
        </div>
        <div className="form-group">
            <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" />
        </div>
        <div className="form-group">
            <textarea className="form-control" name="text" rows="5" value={this.state.text} onChange={this.handleChange} />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class LoopComments extends Component {

  constructor(props) {
    super(props);

    this.message = null;
    this.type = null;

    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(comment_id) {
    request({
        DELETE: `https://inloop-webproject.herokuapp.com/api/feeds/${this.props.feed_id}/comments/${comment_id}`
    }).then(data => {
        this.message = "Commet was successfully deleted";
        this.type = "success";
    }).catch(error => {
        this.message = "Error in deleting comment. Please repeat action.";
        this.type = "danger";
    });
  }
    
    render() {
        
        let self = this;

        return (
            <div className="row">
            {this.props.comments.map(function(comment, i) {
                return (
                    <div key={i} className="col-sm-12">
                        <div className="card feed">
                            <div className="card-block">
                                <img className="feed-avatar rounded-circle" src={comment.person.avatar} alt="Person avatar" />
                                <div className="feed-body">
                                    <h4 className="card-title">{comment.person.firstName} {comment.person.lastName}</h4>
                                    <button className="btn btn-warning float-right" onClick={self.deleteComment(comment.id)} title="Delete feed">X</button>
                                    <p className="card-text feed-timestamp">{moment(comment.date).format('DD. MM. YYYY, h:mm a')}</p>
                                    <p className="card-text feed-text">{comment.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        );
    }
};

class Comment extends Component {
    render() {
        return(
            <div>
                <CommentForm feed_id={this.props.feed_id} />
                <LoopComments feed_id={this.props.feed_id} comments={this.props.comments} />
            </div>
        );
    }
};

export default Comment;
