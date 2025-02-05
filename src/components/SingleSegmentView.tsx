import React from 'react'
import './Mirror.css'
import {Sector} from './Sector'
import {Config} from './Config'
import {SingleSegmentDisplay} from './SingleSegmentDisplay'
import {useAppContext} from "../AppContext"

/**
 * Represents the TMT mirror
 */
export const SingleSegmentView = (): JSX.Element => {


    const {setShowSegmentIds, setCaseNum, viewSize, setViewSize, viewX, viewY} = useAppContext()



    const segment = {pos: '1', x: 274, y: 256}

    const d = viewSize
    const x = viewX
    const y = viewY




    return (
      <div id="svgContainer" className='mirror-container' >

      <svg id="svgImage"
          className='mirror-svg'
          viewBox={`0 0 ${d} ${d}`}
          preserveAspectRatio='xMidYMin slice'>

          <defs>
            <pattern id="pattern1" x="-73" y="-75" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="148" height="148" href="/assets/images/Image_01_Zernike_04.png" />
            </pattern>

          </defs>

          <g className='singleSegmentView'>


              <SingleSegmentDisplay
                pos={segment.pos}
                x={segment.x}
                y={segment.y}
                key={segment.pos}
              />


          </g>

        </svg>

      </div>
    )

}
