import React, { Component } from 'react';

import Grade from './grade';

class GradeTable extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
          <table className="table table-dark table-striped table-borderless table-hover">
            <caption className="pl-2">Student Grade Table by Keith Tachibana</caption>
            <thead className="bg-success">
              <th scope="col">Student Name</th>
              <th scope="col">Course</th>
              <th scope="col">Grade</th>
            </thead>
            <tbody>
              <Grade grades={this.props.grades} />
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default GradeTable;
