import React, { Component } from 'react';

class Grade extends Component {

  render() {
    const { grades } = this.props;
    return (
      <React.Fragment>
        {grades.map(grade => {
          return (
            <tr key={grade.id}>
              <td>{grade.name}</td>
              <td>{grade.course}</td>
              <td>{grade.grade}</td>
              <td><button className="btn btn-danger float-right"><i className="fas fa-trash-alt"> Delete</i></button></td>
            </tr>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Grade;
