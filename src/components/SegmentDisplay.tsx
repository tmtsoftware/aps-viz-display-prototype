import React, {useState} from 'react'
import {Config} from './Config'
import {useAppContext} from "../AppContext"
import {FieldVector} from './FieldVector'


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
  const {caseNum, showSegmentIds, viewSize, setViewSize, setViewX, setViewY, viewX, viewY, edgeDisplay, segmentDisplay, showSectorColors} = useAppContext()

  const labelXOffset = pos.length == 1 ? -4 : (pos.length == 2 ? -9 : -12)


  const label = showSegmentIds ? '' : pos
  const fontSize = 14

  const [open, setOpen] = useState<boolean>(false)




  // TODO: edgePoints needs to be replaced by field vector set

  function vectorField(
  ): Array<JSX.Element> {

      if (segmentDisplay != 1) return []
      else
      return Config.edgePoints.map((point) => {
        return (
          <FieldVector
            startPointX="1"
            startPointY="2"
            endPointX="50"
            endPointY="60"
          />
        )
      })
  }



const fill = (segmentDisplay == 2) ? "url(#pattern" + pos + ")" : "white"


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

      {vectorField()}

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
