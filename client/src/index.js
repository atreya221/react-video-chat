import React from 'react'
import ReactDOM from 'react-dom'

import AppMain from './App_main'
import { ContextProvider } from './SocketContext'
import './styles.css'

ReactDOM.render(
  <ContextProvider>
    <AppMain />
  </ContextProvider>,
document.getElementById('root')
);