import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

import MainHeader from './MainHeader';
import TemplateManagerHeader from './TemplateManagerHeader';
import SystemManagerHeader from './SystemManagerHeader';
import TeamManagerHeader from './TeamManagerHeader';
import LayoutHeader from './LayoutHeader';

const Header = (props) => {

    const path = props.location.pathname.slice(1);
    console.log(this.props);

    if (path == 'templatemanager') {
        return (<div></div>);
    } else if (path == 'editlayout') {
        return (<div></div>);
    } else if (path == 'systemmanager') {
        return (<div></div>);
    } else if (path == 'teammanager') {
        return (<div></div>);
    } else {
        return (<div></div>);
    }
}
export default withRouter(Header);
