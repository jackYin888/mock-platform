import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
export default function configureStore(rootReducer) {
    /**
     * 创建日志报告
     */
    const logger = store => next => action => {

            let result = next(action)
            return result
        }
        /**
         * 在 state 更新完成和 listener 被通知之后发送崩溃报告。
         */
    const crashReporter = store => next => action => {
            try {
                return next(action)
            } catch (err) {
                console.error('Caught an exception!', err)
                Raven.captureException(err, {
                    extra: {
                        action,
                        state: store.getState()
                    }
                })
                throw err
            }
        }
        // applyMiddleware 接—收 createStore()
        // 并返回一个包含兼容 API 的函数。
    let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore)
        // 像使用 createStore() 一样使用它。
    let store = createStoreWithMiddleware(rootReducer)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
