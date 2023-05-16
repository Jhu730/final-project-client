/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view
  return (
    <div>
      <img src={student.imageUrl} style={{ width: '20%', height: '20%', objectFit: 'cover' }} alt="profile"></img>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{"College: " +student.campus.name}</h3>
      <p>{"Email: " + student.email}</p>
      <p>{"GPA: " + student.gpa}</p>
    </div>
  );
};

export default StudentView;
