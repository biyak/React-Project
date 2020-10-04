import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import ReactCollapsingTable from 'react-collapsing-table'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
       isLoading: true,
       students: [],
       error: null,
       search: ""
    };
  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  fetchStudents() {
    // Where we're fetching data from
    fetch(`https://www.hatchways.io/api/assessment/students`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          students: data.students,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));

  }
  componentDidMount() {
    this.fetchStudents();
    console.log(this.students)
  }

  render() {
  const { isLoading, students, error } = this.state;
  let filteredStudents = students.filter(
    (student) => {
      return student.firstName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || 
      student.lastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    }
  );
  return (
    <React.Fragment>
      <Container>
        <Jumbotron>
        <Row>
            <input id="name-input"  type='text' 
            style={{flex: 1}} 
            placeholder="Search by name" 
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            />
        </Row>
        </Jumbotron>
      </Container>

      {!isLoading ? (
        filteredStudents.map(student => {
          const {id, firstName,lastName, email, pic, skill,grades } = student;
          var sum = grades.reduce(function(a, b){
            return parseInt(a) + parseInt(b);
        }, 0);
          return (
            
            <Container>
              <Row>
              <Col></Col>
               <Col sm={8}>
               <div key={id}>
                  <Jumbotron>

                      <Card>
                        <Card.Body>
                          <Row>
                          <Col> 
                            <Image src={pic} roundedCircle thumbnail height="120" width="120"></Image>
                         </Col>
                         <Col>
                          <Card.Title>
                          {firstName} {lastName}
                          </Card.Title>
                          <Card.Text>
                            <p>Email: {email}</p>
                            <p>Skill: {skill}</p>
                            <p>Average: {sum/8}%</p>
                          </Card.Text>
                          </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                  </Jumbotron>
                </div>
               </Col>
              <Col></Col>
            
            </Row>
            </Container>
          );
        })
      // If there is a delay in data, let's let the user know it's loading
      ) : (
        <h3>Loading...</h3>
      )}
    </React.Fragment>
    
  );
  }
}

export default App;
