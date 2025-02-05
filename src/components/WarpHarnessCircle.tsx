import React, {useState} from 'react'
import {Config} from './Config'
import {Data} from './Data'
import {useAppContext} from "../AppContext"

type WarpHarnessCircleProps = {
  startPointX: number
  startPointY: number
  whNum: number
  strain: number
  maxStrain: number
  id: number
}

/**
 * Represents WH circles representation

 * @param x x offset of circle in the display
 * @param y y offset of circle in the display
 * @constructor
 */
export const WarpHarnessCircle = ({
                          startPointX,
                          startPointY,
                          whNum,
                          strain,
                          maxStrain,
                          id
                        }: WarpHarnessCircleProps): JSX.Element => {
  const {showSegmentIds, caseNum} = useAppContext()


// the input configuration will be a value for each circle.  For each edge there are two segments and an angle and a +- direction
// we need to determine for each side of the rectangle, which edge it is and whether it is pointing into the segment or not

const getCircleColor = () => {
  const percent = (strain / maxStrain);
  if (percent > 0.9) return 'red';
  if (percent > 0.75) return 'orange';
  const grey = (1.0 - percent) * 200 + 55;
  return `rgb(${grey}, ${grey}, ${grey})`;
};

const circleColor = getCircleColor(); // Generate once and keep constant

const radius = 25


  return (

      <g className='edgePoints'>

          <circle
            cx={startPointX}
            cy={startPointY}
            r={radius}
            fill={circleColor}
            stroke='black'
            stroke-width='1.0'/>

          <text
               x={startPointX - (radius * 0.5)}
               y={startPointY - (radius * 0.4)}
               fontSize='10'
               fill={'black'}>
               {"WH" + whNum}
           </text>
         <text
               x={startPointX - (radius * 0.8)}
               y={startPointY + (radius * 0.0)}
               fontSize='7'
               fill={'black'}>
               {"strain: " + strain + "Nt"}
           </text>
        <text
              x={startPointX - (radius * 0.7)}
              y={startPointY + (radius * 0.4)}
              fontSize='7'
              fill={'black'}>
              {"max: " + maxStrain + "Nt"}
          </text>
         <text
               x={startPointX - (radius * ((id < 10) ? 0.3 : 0.45))}
               y={startPointY + (radius * 0.87)}
               fontSize='10'
               fill={'black'}>
               {"#" + id}
           </text>

      </g>

  )


}
