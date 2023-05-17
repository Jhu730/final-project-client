import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';

import EditStudentView from '../views/EditStudentView';
import { addStudentThunk, fetchStudentThunk, editStudentThunk, deleteStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state =
        {
          firstname: "",
          lastname: "", 
          email: "",
          gpa: 0,
          imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
          campusId: null, 
          redirect: false, 
          redirectId: null
        };
    }

    componentDidMount() {
        this.props.fetchStudent(window.location.pathname.slice(-1));

        this.setState({
          firstname: this.props.student.firstname,
          lastname: this.props.student.lastname,
          email: this.props.student.email,
          gpa: this.props.student.gpa,
          campusId: this.props.student.campusId,
          imageUrl: this.props.student.imageUrl,
          redirect: false, 
          redirectId: null
        })
    }
   // Capture  new input data when it is entered
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async event => {
        event.preventDefault();

        let editedStudent = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            gpa: this.state.gpa,
            campusId: this.state.campusId,
            imageUrl: this.state.imageUrl,
            id: window.location.pathname.slice(-1)
        };

        await this.props.editStudent(editedStudent);

        this.setState({
          firstname: "", 
          lastname: "", 
          email: "",
          gpa: 0,
          campusId: null,
          imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80", 
          redirect: true, 
          redirectId: window.location.pathname.slice(-1)
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/student/${this.state.redirectId}`}/>)
        }
        return (
            <div>
                <Header />
                <EditStudentView 
                    student={this.props.student}
                    editStudent={this.props.editStudent}
                    deleteStudent={this.props.deleteStudent}
                    fetchStudent={this.props.fetchStudent}
                    handleChange = {this.handleChange} 
                    handleSubmit={this.handleSubmit}      
                />
          </div>
        );
    }
}

const mapState = (state) => {
    return {
      student: state.student,
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchStudent: (student) => dispatch(fetchStudentThunk(student)),
        deleteStudent: (student) => dispatch(deleteStudentThunk(student)),
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

export default connect(mapState, mapDispatch)(EditStudentContainer);