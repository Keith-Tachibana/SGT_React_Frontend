/* eslint-disable no-console */
import React, { Component } from 'react';

class Grade extends Component {

  render() {
    const { grades } = this.props;
    console.log('Grades:', grades);
    return (
      <React.Fragment>
        {grades.map(grade => {
          return (
            <tr key={grade.id}>
              <td>{grade.name}</td>
              <td>{grade.course}</td>
              <td>{grade.grade}</td>
            </tr>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Grade;
