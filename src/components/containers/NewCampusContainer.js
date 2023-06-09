import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "", 
          address: "",
          imageUrl: "https://media.istockphoto.com/id/977724870/vector/university-line-building-illustration.jpg?s=612x612&w=0&k=20&c=8U9fySp2a7D8Jogpt-9YriiCzuenjL2sl8AoHj_YTBU=",
          description: null,
          redirect: false, 
          redirectId: null
        };
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async event => {
        event.preventDefault();

        let campus = {
            name: this.state.name,
            imageUrl: this.state.imageUrl,
            address: this.state.address,
            description: this.state.description,
        };
        
        let newCampus = await this.props.addCampus(campus);

        this.setState({
          name: "", 
          address: null,
          description: null,
          imageUrl: "https://media.istockphoto.com/id/977724870/vector/university-line-building-illustration.jpg?s=612x612&w=0&k=20&c=8U9fySp2a7D8Jogpt-9YriiCzuenjL2sl8AoHj_YTBU=",
          redirect: true, 
          redirectId: newCampus.id
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
            <Header/>
            <NewCampusView 
                handleChange = {this.handleChange} 
                handleSubmit={this.handleSubmit}      
            />
          </div>
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(NewCampusContainer);