import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CaseProvider } from './store'
import { LangProvider } from './i18n'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><BrowserRouter><LangProvider><CaseProvider><App /></CaseProvider></LangProvider></BrowserRouter></React.StrictMode>
)
