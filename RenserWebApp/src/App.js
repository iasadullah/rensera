import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TeamManager from "./screens/TeamManager";
import Product from "./screens/Product";
import TemplateManager from "./screens/TemplateManager";
import SystemManager from "./screens/SystemManager";
import LayoutEdit from "./screens/LayoutEdit";
import Home from "./screens/Home";
import DrupalScreen from "./screens/DrupalScreen";
import UploadFileScreen from "./screens/UploadScreen";
import EditHtml from "./screens/EditHtml";
import "./assets/css/style.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Product} />
        <Route path="/teammanager" component={TeamManager} />
        <Route path="/templatemanager" component={TemplateManager} />
        <Route path="/systemmanager" component={SystemManager} />
        <Route path="/drupal" component={DrupalScreen} />
        <Route path="/upload" component={UploadFileScreen} />
        <Route path="/edit-html" component={EditHtml} />
        <Route
          render={(props) => <LayoutEdit {...props} />}
          path="/layoutedit"
        />
      </Switch>
    </Router>
  );
}

export default App;
