import React from 'react'
import './Mirror.css'
import {Sector} from './Sector'
import {Config} from './Config'
import {SegmentDisplay} from './SegmentDisplay'
import {useAppContext} from "../AppContext"

/**
 * Represents the TMT mirror
 */
export const SegmentView = (): JSX.Element => {


    const {setShowSegmentIds, setCaseNum, viewSize, setViewSize, viewX, viewY} = useAppContext()



    const segments = [
    {pos: '1', x: 70, y: 70},
    {pos: '2', x: 207, y: 70},
    {pos: '3', x: 344, y: 70},
    {pos: '4', x: 481, y: 70},
    {pos: '5', x: 70, y: 200},
    {pos: '6', x: 207, y: 200},
    {pos: '7', x: 344, y: 200},
    {pos: '8', x: 481, y: 200},
    {pos: '9', x: 70, y: 330},
    {pos: '10', x: 207, y: 330},
    {pos: '11', x: 344, y: 330},
    {pos: '12', x: 481, y: 330},
    {pos: '13', x: 70, y: 460},
    {pos: '14', x: 207, y: 460},
    {pos: '15', x: 344, y: 460},
    {pos: '16', x: 481, y: 460},
   ]
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
            <pattern id="pattern2" x="-78" y="-81" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="159" height="159" href="/assets/images/Image_02_Zernike_05.png" />
            </pattern>
            <pattern id="pattern3" x="-78" y="-81" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="159" height="159" href="/assets/images/Image_03_Zernike_06.png" />
            </pattern>
            <pattern id="pattern4" x="-79" y="-82" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="160" height="160" href="/assets/images/Image_04_Zernike_07.png" />
            </pattern>
            <pattern id="pattern5" x="-76" y="-79" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="154" height="154" href="/assets/images/Image_05_Zernike_08.png" />
            </pattern>
            <pattern id="pattern6" x="-81" y="-84" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="163" height="163" href="/assets/images/Image_06_Zernike_09.png" />
            </pattern>
            <pattern id="pattern7" x="-77" y="-78" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="154" height="154" href="/assets/images/Image_07_Zernike_10.png" />
            </pattern>
            <pattern id="pattern8" x="-78" y="-80" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="156" height="156" href="/assets/images/Image_08_Zernike_11.png" />
            </pattern>
            <pattern id="pattern9" x="-78" y="-79" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="156" height="156" href="/assets/images/Image_09_Zernike_12.png" />
            </pattern>
            <pattern id="pattern10" x="-81" y="-84" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="163" height="163" href="/assets/images/Image_10_Zernike_13.png" />
            </pattern>
            <pattern id="pattern11" x="-80" y="-81" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="160" height="160" href="/assets/images/Image_11_Zernike_14.png" />
            </pattern>
            <pattern id="pattern12" x="-82" y="-84" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="164" height="164" href="/assets/images/Image_12_Zernike_15.png" />
            </pattern>
            <pattern id="pattern13" x="-76" y="-77" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="152" height="152" href="/assets/images/Image_13_Random_01.png" />
            </pattern>
            <pattern id="pattern14" x="-79" y="-79" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="157" height="157" href="/assets/images/Image_14_Random_02.png" />
            </pattern>
            <pattern id="pattern15" x="-80" y="-80" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="159" height="159" href="/assets/images/Image_15_Random_03.png" />
            </pattern>
            <pattern id="pattern16" x="-83" y="-83" height="100%" width="100%" patternUnits="userSpaceOnUse">
              <image x="0" y="0" width="165" height="165" href="/assets/images/Image_16_Random_04.png" />
            </pattern>
          </defs>

          <g className='segmentView'>

            {segments.map((segment) => (
              <SegmentDisplay
                pos={segment.pos}
                x={segment.x}
                y={segment.y}
                key={segment.pos}
              />
            ))}

          </g>

        </svg>

      </div>
    )

}
