import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import request, { baseURL } from '../request/Request';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        text: 'Comment...',
        message: '',
        type: ''
    };

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
    let self = this;
    request({
        POST: `${baseURL}/${this.props.feed_id}/comments`,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((data) => {
        self.props.reload(`${baseURL}/${self.props.feed_id}`);
        self.setState({message: "Commet was successfully saved"});
        self.setState({type: "success"});
    }).catch((error) => {
        self.setState({message: "Error in saving comment. Please repeat action."});
        self.setState({type: "danger"});
    });
  }

  render() {

    let requestInfo = null;
    if (this.state.message) {
        requestInfo = ( 
            <div className="row">
                <div className="col-sm-12">
                    <div className={`alert alert-${this.state.type}`} role="alert">
                    <button type="button" className="close" aria-label="Close" onClick={() => this.setState({message: ''})}>
                        <span aria-hidden="true">×</span>
                    </button>
                    {this.state.message}
                    </div>
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
        <button type="submit" className="btn btn-warning addComment" title="Delete feed">
            add comment
        </button>
      </form>
    );
  }
}

class LoopComments extends Component {

  constructor(props) {
    super(props);

    this.state = {
        message: '',
        type: ''
    };

    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(i) {
    let self = this;
    let comment_id = this.props.comments[i]._id;
    request({
        DELETE: `${baseURL}/${this.props.feed_id}/comments/${this.props.comments[i]._id}`
    }).then((data) => {
        self.props.comments.splice(i, 1);
        self.setState({message: "Commet was successfully deleted"});
        self.setState({type: "success"});
    }).catch((error) => {
        self.setState({message: "Error in deleting comment. Please repeat action."});
        self.setState({type: "danger"});
    });
  }
    
    render() {
        
        let self = this;

        let requestInfo = null;
        if (this.state.message) {
            requestInfo = ( 
                <div className="col-sm-12">
                    <div className={`alert alert-${this.state.type}`} role="alert">
                    <button type="button" className="close" aria-label="Close" onClick={() => this.setState({message: ''})}>
                        <span aria-hidden="true">×</span>
                    </button>
                    {this.state.message}
                    </div>
                </div>
            );
        }

        return (
            <div className="row">
            {requestInfo}
            {this.props.comments.map(function(comment, i) {
                return (
                    <div key={i} className="col-sm-12">
                        <div className="card feed">
                            <div className="card-block">
                                <img className="feed-avatar rounded-circle" src={comment.person.avatar} alt="Person avatar" />
                                <div className="feed-body">
                                    <h4 className="card-title">{comment.person.firstName} {comment.person.lastName}</h4>
                                    <button type="button" className="btn btn-warning float-right" onClick={() => self.deleteComment(i)} title="Delete feed">
                                        <span aria-hidden="true">×</span>
                                    </button>
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
                <CommentForm feed_id={this.props.feed_id} reload={this.props.reload} />
                <LoopComments feed_id={this.props.feed_id} comments={this.props.comments} />
            </div>
        );
    }
};

export default Comment;
