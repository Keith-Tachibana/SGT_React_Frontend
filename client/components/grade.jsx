import React, { Component } from 'react';

class Grade extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    const { deleteGrade, id } = this.props;
    deleteGrade(id);
  }

  render() {
    const { name, course, grade } = this.props;
    return (
      <React.Fragment>
        <tr>
          <td>{name}</td>
          <td>{course}</td>
          <td>{grade}</td>
          <td><button className="btn btn-danger btn-sm float-right" onClick={this.handleDelete}><i className="fas fa-trash-alt"> Delete</i></button></td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Grade;
