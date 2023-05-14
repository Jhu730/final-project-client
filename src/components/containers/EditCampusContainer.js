//added
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { EditCampusView } from "../views";
import { editCampusThunk, fetchCampusThunk } from "../../store/thunks";

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      gpa: 0.0,
      campusId: null,
      redirect: false,
      redirectId: null,
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
      redirect: false,
      redirectId: null,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let editedStudent = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      gpa: this.state.gpa,
      campusId: this.state.campusId,
      id: window.location.pathname.slice(-1),
    };

    await this.props.editStudent(editedStudent);

    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      gpa: 0,
      campusId: null,
      redirect: true,
      redirectId: window.location.pathname.slice(-1),
    });
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  }
   

// map state to props
const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    fetchCampus: (campus) => dispatch(fetchCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);
