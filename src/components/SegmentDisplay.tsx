import React, {useState} from 'react'
import {Config} from './Config'
import {useAppContext} from "../AppContext"
import {EdgeVector} from './EdgeVector'
import {EdgeTriangle} from './EdgeTriangle'


type SegmentDisplayProps = {
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
export const SegmentDisplay = ({
                          pos,
                          x,
                          y
                        }: SegmentDisplayProps): JSX.Element => {
  const {caseNum, showSegmentIds, viewSize, setViewSize, setViewX, setViewY, viewX, viewY, edgeDisplay, showSectorColors} = useAppContext()

  const labelXOffset = pos.length == 1 ? -4 : (pos.length == 2 ? -9 : -12)


  const label = showSegmentIds ? '' : pos
  const fontSize = 14

  const [open, setOpen] = useState<boolean>(false)









  // TODO: this is where we can turn the display off by returning empty
  /*
  function edgeVectors(
  ): Array<JSX.Element> {

      if (edgeDisplay != 1) return []
      else
      return Config.edgePoints.map((point) => {
        return (
          <EdgeVector
            key={'A' + point.index}
            index={point.index}
            cellNum={cellNum}
            sectorNum={sectorNum}
            pointX={point.x}
            pointY={point.y}
          />
        )
      })
  }
*/


const fill = "url(#pattern" + pos + ")"
console.log(fill)

  return (
    <g
      key={pos}
      className={'segment'}
      transform={`translate(${x}, ${y})`}>
      <title>{pos}</title>
      <polygon
        stroke='white'
        strokeWidth='1.0'
        points={Config.segmentDisplayPoints}
        fill={fill}
      />

      <text
        x={labelXOffset}
        y='2'
        fontSize={fontSize}
        fill={'black'}>
        {label}
      </text>


    </g>
  )
}
