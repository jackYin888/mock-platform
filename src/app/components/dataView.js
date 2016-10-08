import React, { Component } from "react"
import { connect } from 'react-redux'
// import Highlight from 'react-highlight'
import { desimplify } from 'simplifr'
import { information } from './constant'
import { isObject } from '../../util/tools'
import Faker from 'faker';
class DataView extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {

        };
    }
    schemaGenerator() {
        //this.refs.code.innerText = JSON.stringify(schema, null, '\t')
        // console.log(this.refs)
    }
    componentDidUpdate() {
        // this.refs.code.innerText = JSON.stringify(this.props.mock, null, '\t')
    }
    render() {
        const { viewType } = this.props;

        if (this.props.jsonTree.root.childs.length > 0) {
            let data = this.props.jsonTree
            Object.keys(data).map(function(value, index) {
                // random.word
                // Faker
                // console.log(data[value], value, index)
            });
        }
        let interfaceInformation = Object.keys(this.props.PopForm).map((key, id) => {
            let temp = this.props.PopForm[key];
            let value = isObject(temp) ? JSON.stringify(temp, null, 2) : temp;

            return (
                <p key = {id}><strong>{information[key][0]+'：'}</strong>{value}</p>
            )
        })
        if (viewType == 'schema') {

            return (
                <div className="dataview-div">
                <pre>
                <code ref="code" className="json dataview-code">{JSON.stringify(desimplify(this.props.jsonTree, this.props.path), null, 2)}</code>
                </pre>
            </div>
            )

        }
        if (viewType == 'information') {

            return (
                <div className="dataview-div">

                    <div className="panel panel-success">
                      <div className="panel-heading">
                        <h3 className="panel-title">接口信息</h3>
                      </div>
                      <div className="panel-body">
                        {interfaceInformation}
                      </div>
                    </div>
                </div>
            )

        }
        if (viewType == 'result') {
            return (
                <div className="dataview-div">
                <pre>
                <code ref="code" className="json dataview-code">{JSON.stringify(desimplify(this.props.jsonTree, this.props.path), null, 2)}</code>
                </pre>
            </div>
            )

        }
        return (
            <div className="dataview-div">
                <pre>
                <code ref="code" className="json dataview-code">{'暂无数据'}</code>
                </pre>
            </div>
        )


    }
}

function mapStateToProps(state, props) {
    return {
        PopForm: state.PopForm,
        jsonTree: state.jsonTree
    }
}
export default connect(mapStateToProps)(DataView);
