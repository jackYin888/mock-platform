/*
 * @Author: yangfengchu
 * @Date:   2016-09-09 22:48:24
 * @Last Modified 2016-10-05
 * @Last Modified time: 2016-10-05 10:57:24
 */

'use strict';

//接口详情
//带返回 和编辑 分别到indexpage 和 listpage
import React, { Component } from 'react';
const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 200,
    },
};
export default class Table extends Component {

    render() {
        return (
            <table className="table table-striped table-hover ">
        <thead>
        <tr>
          <th></th>
          <th>接口名称</th>
          <th>含义</th>
          <th>请求方式</th>
          <th>URL地址</th>
          <th>点击复制参数</th>
          <th>状态</th>
          <th>详情</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>getReplyList</td>
          <td>获取回复列表</td>

          <td>GET</td>
          <td>/v2/target/:id/comments</td>
          <th>复制</th>
          <th>正常</th>
          <th>>>详情页</th>
        </tr>
        </tbody>
      </table>
        )
    }
}
