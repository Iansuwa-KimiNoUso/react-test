import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import App from './app/App'
import LanguageContextProvider from 'app/contexts/LanguageContext'
import { Store } from './app/redux/Store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <LanguageContextProvider>
        <Provider store={Store}>
            <App />
        </Provider>
    </LanguageContextProvider>,
    document.getElementById('root')
)

serviceWorker.unregister()
