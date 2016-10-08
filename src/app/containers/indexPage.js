/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
//import without "{ }" when using "export default"
import React, { Component } from 'react';
import Editor from "../components/editor";
import ButtonList from "../components/buttonList";
import JsonTree from '../components/JsonTree';
import SchemaTab from '../components/tab';
import Prompt from '../components/prompt'
import Nav from '../components/nav';
export default class IndexPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        //<Prompt/>
        return (
            <div className="container">
                <Nav/>
                <ButtonList/>
                <Editor/>
                <SchemaTab/>
            </div>
        );
    }
}
