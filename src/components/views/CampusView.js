/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, deleteStudent} = props;

  if(!campus.students.length){
    return(
      <div>
        <div>
          <img src={campus.imageUrl} alt="campus" style={{ width: '40%', height: '40%', objectFit: 'cover' }}></img>
          <h1>{campus.name}</h1>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <Link to={`/editcampus/${campus.id}`}>
            <button>Edit Campus</button>
          </Link>
          <Link to={`/campuses`}>
            <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
          </Link>
        </div>
        <div>There are no students enrolled at this campus.</div>
        <Link to={`/newstudent`}>
          <button>Add students</button>
        </Link>   
      </div>
    )
  }
  // Render a single Campus view with list of its students
  return (
    <div>
      <img src={campus.imageUrl} alt="campus" style={{ width: '40%', height: '40%', objectFit: 'cover' }}></img>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
      <Link to={`/campuses`}>
        <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      </Link>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2 style={{display: 'inline'}}>{name}</h2><button style={{display: 'inline', marginLeft: '20px'}} onClick={() => deleteStudent(student.id)}>Delete Student</button>  
            </Link>
          </div>
        );
      })}
      <br>
      </br>
      <Link to={`/newstudent`}>
        <button>Add students</button>
      </Link>   
    </div>
  );
};

export default CampusView;