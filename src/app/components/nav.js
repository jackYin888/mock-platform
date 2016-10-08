/*
 * @Author: yangfengchu
 * @Date:   2016-08-25 18:41:37
 * @Last Modified 2016-10-05
 * @Last Modified time: 2016-10-05 09:32:42
 */
'use strict';
//导航栏
import React, { Component } from 'react';
export default class Nav extends Component {
    render() {
        return (
            <div className="bs-component">
          <div className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-warning-collapse">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="javascript:void(0)">Mock</a>
              </div>
              <div className="navbar-collapse collapse navbar-default-collapse">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="javascript:void(0)">生成器</a></li>
                  <li><a href="javascript:void(0)">API列表</a></li>
                </ul>
                <form className="navbar-form navbar-left">
                  <div className="form-group is-empty">
                    <input type="text" className="form-control col-md-8" placeholder="Search"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        );
    }
}
