import React from 'react'
import {Segment} from './Segment'
import {Config} from './Config'
import {useAppContext} from "../AppContext";

type SectorProps = {
  sector: string
}

/**
 * Represents a sector of the mirror
 * @param sector A to F
 * @param showSegmentIds if true display segment ids in the segments instead of the position
 * @constructor
 */
export const Sector = ({sector,}: SectorProps): JSX.Element => {

  const xInc = (3 * Config.segmentRadiusMirrorDisplay) / 2.0
  const yInc = Config.segmentRadiusMirrorDisplay * Math.sin((60 * Math.PI) / 180.0)

  const xStart = Config.xOrigin + xInc * 2
  const yStart = Config.yOrigin - yInc * 2

  const angle = Config.sectorAngle(sector)

  function segmentRow(
    row: number,
    count: number,
    firstPos: number,
    offset = 0
  ): Array<JSX.Element> {

    return [...Array(count).keys()].map((i) => {
      const pos = `${sector}${firstPos + i}`
      const key = pos
      return (
        <Segment
          pos={pos}
          key={key}
          x={xStart + xInc * row}
          y={yStart + yInc * (2 - count + (i + offset / 2.0) * 2)}
        />
      )
    })

  }

  function segmentRows(): Array<JSX.Element> {
    return [...Array(12).keys()].flatMap((i) => {
      switch (i) {
        case 10:
          return segmentRow(10, 11, 66, 1)
        case 11:
          return segmentRow(11, 6, 77, 1)
        default:
          return segmentRow(i, i + 2, (i * (i + 3)) / 2 + 1)
      }
    })
  }

  return (
    <g
      id={sector}
      transform={`rotate(${angle}, ${Config.xOrigin}, ${Config.yOrigin})`}>
      {segmentRows()}
    </g>
  )
}
