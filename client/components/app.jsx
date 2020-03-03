import React from 'react';

import Header from './header';
import GradeTable from './gradeTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
  }

  componentDidMount() {
    this.getGrades();
  }

  async getGrades() {
    try {
      const response = await fetch('http://localhost:3001/api/grades');
      const grades = await response.json();
      this.setState({
        grades
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-4">
            <Header className="text-success pl-2" />
          </div>
        </div>
        <GradeTable grades={this.state.grades} />
      </React.Fragment>
    );
  }
}

export default App;
