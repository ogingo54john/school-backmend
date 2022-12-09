const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const courseRoutes = require("./Course/CourseRoute/courseRoutes");
const router = require("./Admin/AdminRoutes/adminRoutes");
const studentRoutes = require("./studentRoutes");
const instructor = require("./InstructorRoute/instructor");
const assignment = require("./AssignmentRoute/assignment");
const SMS = require("../backend/Course/SMSSender/SMSSender");
const instLogrouter = require("./login/instLogRoute");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

//additional routes
const feeRoute = require('./feesRoute/fees')
const resultRoute = require('./resultsRoute/results')

// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
// passport use and initialize
app.use(passport.initialize());
app.use(passport.session());

//const courseRoutes = express.Router();
const PORT = process.env.PORT;

//const courseModel = require("./courseSchema");
const mongoConnect = process.env.mongoURL
mongoose
  .connect( mongoConnect,
    //"mongodb+srv://Fasrin:0767739896@mydb-pazde.mongodb.net/AF_WD_19?retryWrites=true&w=majority",
    { useNewUrlParser: false }
  )
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch(err => {
    console.log(err.message);
  });

//Sendin an SMS
courseRoutes.route("/sendsms").post(cors(), (req, res) => {
  SMS.sendSMS(req.body);
  res.json(req.body);
});

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//MiddlewaresCourse
app.use("/api/course", courseRoutes);

//MiddlewaresAdmin
app.use("/api", router);

//MiddlewaresStudent
app.use("/api/student", studentRoutes);

//Instructor
app.use("/api/instructor", instructor);
app.use("/api/assignments", assignment);

//Middlewre instructor login
app.use("/api", instLogrouter);

//additional routes
app.use('/api/fees',feeRoute);
app.use('/api/result', resultRoute);

app.listen(PORT, function() {
  console.log("Server is running on port : " + PORT);
});