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
  // edge display type
  edgeDisplay: number
  setEdgeDisplay: (value: number) => void

  // segment display type
  showVectorFieldPlot: boolean
  setShowVectorFieldPlot: (value: boolean) => void
  showSurfacePlot: boolean
  setShowSurfacePlot: (value: boolean) => void
  showWhCircles: boolean
  setShowWhCircles: (value: boolean) => void

  // M1 segments displayType
  showBySegmentMaxWhValue: boolean
  setShowBySegmentMaxWhValue: (value: boolean) => void

  showSegmentTipTiltsFM: boolean
  setShowSegmentTipTiltsFM: (value: boolean) => void
  showSegmentTipTiltsRand: boolean
  setShowSegmentTipTiltsRand: (value: boolean) => void
  showSegmentTipTiltPistonsFM: boolean
  setShowSegmentTipTiltPistonsFM: (value: boolean) => void
  showSegmentPistonsFM: boolean
  setShowSegmentPistonsFM: (value: boolean) => void
  showSegmentArrows: boolean
  setShowSegmentArrows: (value: boolean) => void

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
  setDisplay: (_: number) => {},
  edgeDisplay: 0,
  setEdgeDisplay: (_: number) => {},

  showVectorFieldPlot: false,
  setShowVectorFieldPlot: (_: boolean) => {},
  showSurfacePlot: false,
  setShowSurfacePlot: (_: boolean) => {},
  showWhCircles: false,
  setShowWhCircles: (_: boolean) => {},

  showBySegmentMaxWhValue: false,
  setShowBySegmentMaxWhValue: (_: boolean) => {},
  showSegmentTipTiltsFM: false,
  setShowSegmentTipTiltsFM: (_: boolean) => {},
  showSegmentTipTiltsRand: false,
  setShowSegmentTipTiltsRand: (_: boolean) => {},
  showSegmentTipTiltPistonsFM: false,
  setShowSegmentTipTiltPistonsFM: (_: boolean) => {},
  showSegmentPistonsFM: false,
  setShowSegmentPistonsFM: (_: boolean) => {},
  showSegmentArrows: false,
  setShowSegmentArrows: (_: boolean) => {}


}

export const appContext = createContext<AppContextState>(appContextDefaultValue)
export const useAppContext = () => useContext(appContext)

