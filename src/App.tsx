import React, {useContext, useEffect, useState} from 'react'
import './App.css'
import {Topbar} from './components/Topbar'
import {Mirror} from './components/Mirror'
import {SegmentView} from './components/SegmentView'
import {SingleSegmentView} from './components/SingleSegmentView'
import {Layout} from "antd"
import 'antd/dist/antd.css'
import {Sidebar} from "./components/Sidebar";
import {format} from "date-fns";
import {appContext, AppContextState} from './AppContext'
import {Config} from './components/Config'

const {Content} = Layout

const App = (): JSX.Element => {
  const [showSegmentIds, setShowSegmentIds] = useState<boolean>(false)
  const [showSectorColors, setShowSectorColors] = useState<boolean>(true)

  const [caseNum, setCaseNum] = useState<number>(0)

  const [viewSize, setViewSize] = useState<number>(Config.mirrorDiameter)

  const [viewX, setViewX] = useState<number>(0)
  const [viewY, setViewY] = useState<number>(0)

  const [display, setDisplay] = useState<number>(0)

  const [edgeDisplay, setEdgeDisplay] = useState<number>(0)
  const [showVectorFieldPlot, setShowVectorFieldPlot] = useState<boolean>(false)
  const [showSurfacePlot, setShowSurfacePlot] = useState<boolean>(false)
  const [showWhCircles, setShowWhCircles] = useState<boolean>(false)
  const [showBySegmentMaxWhValue, setShowBySegmentMaxWhValue] = useState<boolean>(false)
  const [showSegmentTipTilts, setShowSegmentTipTilts] = useState<boolean>(false)



  const appContextValues: AppContextState = {

    showSegmentIds,
    setShowSegmentIds,
    showSectorColors,
    setShowSectorColors,
    caseNum,
    setCaseNum,
    viewSize,
    setViewSize,
    viewX,
    viewY,
    setViewX,
    setViewY,
    display,
    setDisplay,
    edgeDisplay,
    setEdgeDisplay,
    showVectorFieldPlot,
    setShowVectorFieldPlot,
    showSurfacePlot,
    setShowSurfacePlot,
    showWhCircles,
    setShowWhCircles,
    showBySegmentMaxWhValue,
    setShowBySegmentMaxWhValue,
    showSegmentTipTilts,
    setShowSegmentTipTilts
  }



    return (
      <appContext.Provider value={appContextValues}>
        <Layout className='App'>
          <Topbar/>
          <Layout>
            <Sidebar/>
            <Content>
              {display==1 && (
                <Mirror/>
              )}
              {display==2 && (
                 <SegmentView/>
               )}
             {display==3 && (
                <SingleSegmentView/>
              )}
            </Content>
          </Layout>
        </Layout>
      </appContext.Provider>
    )
}
export default App
