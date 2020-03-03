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
    this.deleteGrade = this.deleteGrade.bind(this);
  }

  componentDidMount() {
    this.getGrades();
  }

  componentDidUpdate() {
    this.getAverageGrade();
  }

  async getGrades() {
    try {
      const response = await fetch('/api/grades');
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
      const response = await fetch('/api/grades', {
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
      const gradesCopy = [...this.state.grades];
      gradesCopy.splice(findIndex, 1);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const response = await fetch(`/api/grades/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(gradesCopy),
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
            <GradeTable grades={this.state.grades} deleteGrade={this.deleteGrade} />
            <GradeForm addGrade={this.addGrade} />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
