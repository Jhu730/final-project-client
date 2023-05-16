import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "", 
          address: "",
          description: null,
          imageUrl: "https://media.istockphoto.com/id/977724870/vector/university-line-building-illustration.jpg?s=612x612&w=0&k=20&c=8U9fySp2a7D8Jogpt-9YriiCzuenjL2sl8AoHj_YTBU=",
          redirect: false, 
          redirectId: null,
          id: null
        };
    }

    componentDidMount() {
        this.props.fetchCampus(window.location.pathname.slice(-1));

        this.setState({
          name: this.props.campus.name,
          address: this.props.campus.address,
          description: this.props.campus.description,
          imageUrl: this.props.campus.imageUrl,
          redirect: false, 
          redirectId: null,
          id: this.props.campus.id
        })
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async event => {
        event.preventDefault();

        let editedCampus = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
            id: window.location.pathname.slice(-1)
        };
        
        await this.props.editCampus(editedCampus);

        this.setState({
          name: "", 
          address: null,
          description: null,
          imageUrl: "https://media.istockphoto.com/id/977724870/vector/university-line-building-illustration.jpg?s=612x612&w=0&k=20&c=8U9fySp2a7D8Jogpt-9YriiCzuenjL2sl8AoHj_YTBU=",
          redirect: true, 
          redirectId: window.location.pathname.slice(-1)
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
        return (
            <div>
                <Header />
          <EditCampusView 
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}  
            campus={this.props.campus}
            editCampus={this.props.editCampus}  
            fetchCampus={this.props.fetchCampus}  
          />
          </div>
        );
    }
}

const mapState = (state) => {
    return {
      campus: state.campus,
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        fetchCampus: (campus) => dispatch(fetchCampusThunk(campus)),
    })
}

export default connect(mapState, mapDispatch)(EditCampusContainer);