/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view
  return (
    <div>
      <img src={student.imageUrl} style={{ width: '20%', height: '20%', objectFit: 'cover' }} alt="profile"></img>
      <h1>{student.firstname + " " + student.lastname}</h1>
      {student.campusId ? (<Link to={`/campus/${student.campusId}`} ><h3>{"College: " +student.campus.name}</h3></Link>) : (<h3>This student is not enrolled</h3>)}
      <p>{"Email: " + student.email}</p>
      <p>{"GPA: " + student.gpa}</p>
      <Link to={`/editstudent/` + student.id}>
        <button>Edit Student</button>
      </Link>
      <Link to={'/students'}>
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </Link>
    </div>
  );
};

export default StudentView;
