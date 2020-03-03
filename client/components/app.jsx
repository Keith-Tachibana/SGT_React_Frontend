import React from 'react';

import Header from './header';
import GradeTable from './gradeTable';
import GradeForm from './gradeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.addGrade = this.addGrade.bind(this);
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

  async addGrade(newEntry) {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const response = await fetch('http://localhost:3001/api/grades', {
        method: 'POST',
        body: JSON.stringify(newEntry),
        headers
      });
      const result = await response.json();
      this.setState({
        grades: this.state.grades.concat(result)
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteGrade(id) {
    try {
      const { grades } = this.state;
      const findIndex = grades.findIndex(grade => grade.id === id);
      grades.splice(findIndex, 1);
      const responseBody = JSON.stringify(grades);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const response = await fetch(`http://localhost:3001/api/grades/${id}`, {
        method: 'DELETE',
        responseBody,
        headers
      });
      const result = await response.json();
      this.setState({
        grades: result
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
    const displayAvg = isNaN(average) ? 'N/A' : average.toFixed(1);
    return displayAvg;
  }

  render() {
    return (
      <React.Fragment>
        <Header averageGrade={this.getAverageGrade()} />
        <main>
          <div className="row">
            <GradeTable grades={this.state.grades} />
            <GradeForm addGrade={this.addGrade} />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
