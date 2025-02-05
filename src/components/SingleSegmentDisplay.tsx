import React, {useState} from 'react'
import {Config} from './Config'
import {WhData} from './WhData'
import {useAppContext} from "../AppContext"
import {FieldVector} from './FieldVector'
import {WarpHarnessCircle} from './WarpHarnessCircle'

type SingleSegmentDisplayProps = {
  pos: string
  x: number
  y: number
}
/**
 * Represents one of the 492 segments of the mirror

 * @param pos A1 to F82
 * @param x x offset of segment in the display
 * @param y y offset of segment in the display
 * @constructor
 */
export const SingleSegmentDisplay = ({
                          pos,
                          x,
                          y
                        }: SingleSegmentDisplayProps): JSX.Element => {
  const {caseNum, showSegmentIds, viewSize, setViewSize, setViewX, setViewY, viewX, viewY, edgeDisplay, showVectorFieldPlot, showSurfacePlot, showWhCircles, showSectorColors} = useAppContext()

  const labelXOffset = 0

  const dataIndex = parseInt(pos)

  const label = showSegmentIds ? '' : pos
  const fontSize = 12

  const [open, setOpen] = useState<boolean>(false)

  const segPositionScaleFactor = 88.0

  const offsetData = [
  WhData.offsetsCase1, WhData.offsetsCase2, WhData.offsetsCase3, WhData.offsetsCase4,
  WhData.offsetsCase5, WhData.offsetsCase6, WhData.offsetsCase7, WhData.offsetsCase8,
  WhData.offsetsCase9, WhData.offsetsCase10, WhData.offsetsCase11, WhData.offsetsCase12,
  WhData.offsetsCase13, WhData.offsetsCase14, WhData.offsetsCase15, WhData.offsetsCase16,
  ]

  const edgeLen = Config.segmentRadiusSingleSegmentDisplay


  const whData = [
    {id: 1, strain: 45, maxStrain: 100},
    {id: 16, strain: 65, maxStrain: 88},
    {id: 19, strain: 0.1, maxStrain: 50},
    {id: 10, strain: 76, maxStrain: 100},
    {id: 4, strain: 23, maxStrain: 48},
    {id: 11, strain: 7, maxStrain: 77},
    {id: 5, strain: 8, maxStrain: 100},

    {id: 2, strain: 45, maxStrain: 50},
    {id: 17, strain: 10, maxStrain: 44},
    {id: 20, strain: 87, maxStrain: 100},
    {id: 12, strain: 4, maxStrain: 100},
    {id: 6, strain: 92, maxStrain: 100},
    {id: 13, strain: 54, maxStrain: 100},
    {id: 7, strain: 21, maxStrain: 67},

    {id: 3, strain: 18, maxStrain: 67},
    {id: 18, strain: 34, maxStrain: 67},
    {id: 21, strain: 78, maxStrain: 100},
    {id: 14, strain: 2, maxStrain: 100},
    {id: 8, strain: 66, maxStrain: 100},
    {id: 15, strain: 53, maxStrain: 100},
    {id: 9, strain: 59, maxStrain: 100},
 ]

  function vectorField(
  ): Array<JSX.Element> {

      if (!showVectorFieldPlot) return []
      else
      return offsetData[dataIndex-1].map((offset) => {
        return (
          <FieldVector
            startPointX={offset.posX * segPositionScaleFactor}
            startPointY={-offset.posY * segPositionScaleFactor}
            endPointX={offset.offsetX * segPositionScaleFactor}
            endPointY={-offset.offsetY * segPositionScaleFactor}
          />
        )
      })
  }

 function generateWh1Circles(
  ): Array<JSX.Element> {

      if (!showWhCircles) return []
      else
        return Config.wh1Positions.map((whPos, index) => {

          return (
            <WarpHarnessCircle
              startPointX={whPos.posX * edgeLen - edgeLen/2}
              startPointY={whPos.posY * edgeLen - edgeLen + 3.5}
              whNum={whPos.whNum}
              strain={whData[index].strain}
              maxStrain={whData[index].maxStrain}
              id={whData[index].id}
            />
          )
        })
  }

 function generateWh2Circles(
  ): Array<JSX.Element> {

      if (!showWhCircles) return []
      else
        return Config.wh2Positions.map((whPos, index) => {

          return (
            <WarpHarnessCircle
              startPointX={whPos.posX * edgeLen + (edgeLen * 1.1)}
              startPointY={whPos.posY * edgeLen + edgeLen/20 + 3.5}
              whNum={whPos.whNum}
              strain={whData[index+7].strain}
              maxStrain={whData[index+7].maxStrain}
              id={whData[index+14].id}
            />
          )
        })
  }

 function generateWh3Circles(
  ): Array<JSX.Element> {

      if (!showWhCircles) return []
      else
        return Config.wh3Positions.map((whPos, index) => {

          return (
            <WarpHarnessCircle
              startPointX={whPos.posX * edgeLen - (edgeLen * 1.1)}
              startPointY={whPos.posY * edgeLen + edgeLen/20 + 3.5}
              whNum={whPos.whNum}
               strain={whData[index+14].strain}
               maxStrain={whData[index+14].maxStrain}
               id={whData[index+14].id}
            />
          )
        })
  }




const fill = (showSurfacePlot) ? "url(#pattern" + pos + ")" : "white"


  return (
    <g
      key={pos}
      className={'segment'}
      transform={`translate(${x}, ${y})`}>
      <title>{pos}</title>
      <polygon
        stroke='white'
        strokeWidth='1.0'
        points={Config.singleSegmentDisplayPoints}
        fill={fill}
      />


      {generateWh1Circles()}
      {generateWh2Circles()}
      {generateWh3Circles()}

      <line
          x1={0}
          y1={0}
          x2={86.603 * 2.22}
          y2={-50 * 2.22}
          stroke='black'
          stroke-width='1' />

     <line
        x1={0}
        y1={0}
        x2={-86.603 * 2.22}
        y2={-50 * 2.22}
        stroke='black'
        stroke-width='1' />

     <line
        x1={0}
        y1={0}
        x2={0}
        y2={222}
        stroke='black'
        stroke-width='1' />

        <circle
            cx={0}
            cy={0}
            r={10}
            fill='white'
            stroke='black'
            stroke-width='1.0'/>
      <text
        x='-4'
        y='4'
        fontSize={fontSize}
        fill={'black'}>
        {label}
      </text>

      <text
        x={-edgeLen/8}
        y={-edgeLen/1.23}
        fontSize='12'
        fill={'black'}>
        WhiffleTree-1
      </text>
      <text
        x={-edgeLen/2.5}
        y={edgeLen/1.18}
        fontSize='12'
        fill={'black'}>
        WhiffleTree-2
      </text>
      <text
        x={edgeLen/11}
        y={edgeLen/1.18}
        fontSize='12'
        fill={'black'}>
        WhiffleTree-3
      </text>


    </g>
  )
}
