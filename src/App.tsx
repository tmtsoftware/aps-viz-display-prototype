import React, {useContext, useEffect, useState} from 'react'
import './App.css'
import {Topbar} from './components/Topbar'
import {Mirror} from './components/Mirror'
import {Layout} from "antd"
import 'antd/dist/antd.css'
import {Sidebar} from "./components/Sidebar";
import {format} from "date-fns";
import {appContext, AppContextState} from './AppContext'
import {Config} from './components/Config'

const {Content} = Layout

const App = (): JSX.Element => {
  const [showSegmentIds, setShowSegmentIds] = useState<boolean>(false)

  const [caseNum, setCaseNum] = useState<number>(0)

  const [viewSize, setViewSize] = useState<number>(Config.mirrorDiameter)

  const [viewX, setViewX] = useState<number>(0)
  const [viewY, setViewY] = useState<number>(0)

  const appContextValues: AppContextState = {

    showSegmentIds,
    setShowSegmentIds,
    caseNum,
    setCaseNum,
    viewSize,
    setViewSize,
    viewX,
    viewY,
    setViewX,
    setViewY
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
