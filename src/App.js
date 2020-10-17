import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CustomerPage from "./components/customer/CustomerPage";
import ContactPage from "./components/contact/ContactPage";
import PrjCusLinkPage from "./components/prj_cus_link/PrjCusLinkPage";
import ProjectPage from "./components/project/ProjectPage";
import RecItemPage from "./components/rec_item/RecItemPage";
import RecordPage from "./components/record/RecordPage";
import NavBar from "./components/Nav/NavBar";

function App() {
  let HomePage = CustomerPage;

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/customers" component={CustomerPage} />
        <Route exact path="/contacts" component={ContactPage} />
        <Route exact path="/prjCusLinks" component={PrjCusLinkPage} />
        <Route exact path="/projects" component={ProjectPage} />
        <Route exact path="/recItems" component={RecItemPage} />
        <Route exact path="/records" component={RecordPage} />
        <footer>a</footer>
      </div>
    </Router>
  );
}

export default App;
