import React, {createContext, useContext} from "react"
import {Config} from './components/Config'


// Application context: Holds values and functions that are shared by different components in the app

export type AppContextState = {

  // Optionally display segment ids instead of positions
  showSegmentIds: boolean
  setShowSegmentIds: (value: boolean) => void

  showSectorColors: boolean
  setShowSectorColors: (value: boolean) => void

  // data case
  caseNum: number
  setCaseNum: (value: number) => void

  // view size
  viewSize: number
  setViewSize: (value: number) => void
  viewX: number
  viewY: number
  setViewX: (value: number) => void
  setViewY: (value: number) => void

  // display type
  display: number
  setDisplay: (value: number) => void
}

const appContextDefaultValue: AppContextState = {

  showSegmentIds: false,
  setShowSegmentIds: (_: boolean) => {},

  showSectorColors: true,
  setShowSectorColors: (_: boolean) => {},

  caseNum: 0,
  setCaseNum: (_: number) => {},

  viewSize: Config.mirrorDiameter,
  setViewSize: (_: number) => {},
  viewX: 0,
  viewY: 0,
  setViewX: (_: number) => {},
  setViewY: (_: number) => {},

  display: 0,
  setDisplay: (_: number) => {}

}

export const appContext = createContext<AppContextState>(appContextDefaultValue)
export const useAppContext = () => useContext(appContext)

