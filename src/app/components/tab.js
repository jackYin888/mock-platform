import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DataView from './dataView';
// import JsonView from './JsonView';
//Tabs.setUseDefaultStyles(false);

export default class schemaTab extends Component {
    render() {
        return (
            <div className="col-md-6">
        <Tabs>
            <TabList>
                <Tab>mock数据</Tab>
                <Tab>源数据</Tab>
                <Tab>接口信息</Tab>
            </TabList>
            <TabPanel>
                <h2>模拟数据</h2>
                <DataView viewType ="result" path="root" visible={true}/>
            </TabPanel>
            <TabPanel>
                <h2>源数据</h2>
                <DataView viewType ="schema" path="root" visible={true}/>
            </TabPanel>
            <TabPanel>
                <DataView viewType ="information" path="root" visible={true}/>
            </TabPanel>
        </Tabs>
    </div>

        );
    }
};
