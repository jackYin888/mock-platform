import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import IndexPage from './containers/indexPage'
import ListPage from './containers/listPage'
import DetailPage from './containers/detailPage'
import { createStore, combineReducers } from 'redux'
import configureStore from './store/configureStore'
import reducers from './reducers/index'

// import { createDevTools } from 'redux-devtools'
// import LogMonitor from 'redux-devtools-log-monitor'
// import DockMonitor from 'redux-devtools-dock-monitor'
// const reducer = combineReducers({
//     ...reducers,
// })
// const DevTools = createDevTools(
//     <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//     <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//   </DockMonitor>
// )


import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const store = configureStore(reducers)
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
    <IndexPage/>
    </Provider>,
    document.getElementById('app'));

//定义
// export { default as JsonTree } from './components/JsonTree'
// export * from './actions'
// export * from './reducers'
// 引用
// import { JsonTree } from '../../src'
