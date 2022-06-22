import React, {useState} from 'react'
import {Config} from './Config'
import {Data} from './Data'
import {useAppContext} from "../AppContext"

type FieldVectorProps = {
  startPointX: number
  startPointY: number
  endPointX: number
  endPointY: number
}

/**
 * Represents edge line representation

 * @param x x offset of segment in the display
 * @param y y offset of segment in the display
 * @constructor
 */
export const FieldVector = ({
                          startPointX,
                          startPointY,
                          endPointX,
                          endPointY
                        }: FieldVectorProps): JSX.Element => {
  const {showSegmentIds, caseNum} = useAppContext()


// the input configuration will be a value for each edge.  For each edge there are two segments and an angle and a +- direction
// we need to determine for each side of the rectangle, which edge it is and whether it is pointing into the segment or not




const radius = 1


  return (

      <g className='edgePoints'>

          <circle
            cx={startPointX}
            cy={startPointY}
            r={radius}
            fill='red' />

          <line
            x1={startPointX}
            y1={startPointY}
            x2={endPointX}
            y2={endPointY}
            stroke='black'
            stroke-width='0.4' />
      </g>

  )


}
