import React, { Component } from 'react';
import 'whatwg-fetch'
import moment from 'moment';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        text: 'Comment...',
        requestResult: {
            success: false,
            danger: false
        }
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
    let result = this.request(data);
    result.then((value) => {
        this.setState({[value]: true});
    });
  }

  request(data) {
    return fetch(`https://inloop-webproject.herokuapp.com/api/feeds/${this.props.feed_id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((data) => {
        return "success";
    }).catch((error) => {
        console.log('request failed', error);
        return "danger";
    })
  }

  closeInfo(name) {
    this.setState({[name]: false});
  }

  render() {

    let message = null;
    let type = null;
    let requestInfo =null;
    if (this.state.success) {
        message = "Commet was successfully saved";
        type = "success";
    }
    if (this.state.danger) {
        message = "Error in saving comment. Please repeat action.";
        type = "danger";
    }
    if (message) {
        requestInfo = ( 
            <div className="row">
                <div className="alert alert-success" role="alert">
                <button type="button" className="close" aria-label="Close" onClick={this.closeInfo(type)}>
                    <span aria-hidden="true">×</span>
                </button>
                {message}
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
    render() {
        return (
            <div className="row">
            {this.props.comments.map(function(comment, i) {
                return (
                    <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="card feed">
                            <div className="card-block">
                                <img className="feed-avatar rounded-circle" src={comment.person.avatar} alt="Person avatar" />
                                <div className="feed-body">
                                    <h4 className="card-title">{comment.person.firstName} {comment.person.lastName}</h4>
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
                <LoopComments comments={this.props.comments} />
            </div>
        );
    }
};

export default Comment;
