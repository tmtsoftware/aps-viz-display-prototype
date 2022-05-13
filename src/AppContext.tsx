import React, {createContext, useContext} from "react"



// Application context: Holds values and functions that are shared by different components in the app

export type AppContextState = {

  // Optionally display segment ids instead of positions
  showSegmentIds: boolean
  setShowSegmentIds: (value: boolean) => void

  // data case
  caseNum: number
  setCaseNum: (value: number) => void
}

const appContextDefaultValue: AppContextState = {

  showSegmentIds: false,
  setShowSegmentIds: (_: boolean) => {},

  caseNum: 0,
  setCaseNum: (_: number) => {}
}

export const appContext = createContext<AppContextState>(appContextDefaultValue)
export const useAppContext = () => useContext(appContext)

