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

  componentDidUpdate() {
    this.getAverageGrade();
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

  getAverageGrade() {
    const { grades } = this.state;
    let result = 0;
    for (let i = 0; i < grades.length; i++) {
      result += grades[i].grade;
    }
    const average = result / grades.length;
    return average.toFixed(1);
  }

  render() {
    return (
      <React.Fragment>
        <Header className="text-success pl-2" averageGrade={this.getAverageGrade()} />
        <GradeTable grades={this.state.grades} />
      </React.Fragment>
    );
  }
}

export default App;
