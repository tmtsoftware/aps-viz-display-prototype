import React, {useContext, useEffect, useState} from 'react'
import './App.css'
import {Topbar} from './components/Topbar'
import {Mirror} from './components/Mirror'
import {SegmentData, SegmentToM1Pos} from './components/SegmentData'
import {Layout} from "antd"
import 'antd/dist/antd.css'
import {Sidebar} from "./components/Sidebar";
import {format} from "date-fns";
import {AuthContext} from '@tmtsoftware/esw-ts'
import {appContext, AppContextState} from './AppContext'

const {Content} = Layout

const App = (): JSX.Element => {
  const [showSegmentIds, setShowSegmentIds] = useState<boolean>(false)
  const [showSpares, setShowSpares] = useState<boolean>(false)
  const [posMap, setPosMap] = useState<Map<string, SegmentToM1Pos>>(new Map())

  const [mostRecentChange, setMostRecentChange] = useState<Date>(new Date(0))
  const [viewMode, setViewMode] = useState<React.Key>("installed")
  const [jiraMode, setJiraMode] = useState<boolean>(false)
  const [authEnabled, setAuthEnabled] = useState<boolean>(true)
  const [refDate, setRefDate] = useState<Date>(new Date())

  const {auth} = useContext(AuthContext)


  function updateDisplay() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(format(new Date(), 'yyyy-MM-dd'))
    }
    /*
    fetch(`${SegmentData.baseUri}/mostRecentChange`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const dateStr: string = result
        const date: Date = new Date(dateStr)
      })
    */
  }


  const appContextValues: AppContextState = {
    refDate,
    setRefDate,
    updateDisplay,
    viewMode,
    setViewMode,
    jiraMode,
    showSegmentIds,
    setShowSegmentIds,
    showSpares,
    setShowSpares,
    auth,
    authEnabled,
    posMap,
    mostRecentChange
  }



    return (
      <appContext.Provider value={appContextValues}>
        <Layout className='App'>
          <Topbar/>
          <Layout>
            <Sidebar/>
            <Content>
              <Mirror/>
            </Content>
          </Layout>
        </Layout>
      </appContext.Provider>
    )
}
export default App
