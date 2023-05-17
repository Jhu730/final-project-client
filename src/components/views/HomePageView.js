/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  image: {
    display: "flex",
    justifyContent: "center",
    width: "65%",
    margin: "auto",
  },

  welcome:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'purple',
    width: "65%",
    margin: "auto",
  },
}));
const HomePageView = () => {
  // Render Home page view
  const classes = useStyles();
  return (
    <div>
      <h1>Home Page</h1>
      <img
        src="https://nypost.com/wp-content/uploads/sites/2/2020/10/012420Starbucks7HS.jpg?quality=75&strip=all"
        alt="homepageImg"
        className={classes.image}
      />
      <div className={classes.welcome}><h1>Welcome to Our Campus Maagement Website </h1></div>
    </div>
      
  );
};

export default HomePageView;
