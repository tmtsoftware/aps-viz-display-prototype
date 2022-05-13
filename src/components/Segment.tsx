import React, {useState} from 'react'
import {Config} from './Config'
import {useAppContext} from "../AppContext"
import {SegmentEdge} from './SegmentEdge'

type SegmentProps = {
  id?: string
  pos: string
  x: number
  y: number
}

/**
 * Represents one of the 492 segments of the mirror
 * @param id the segment id
 * @param pos A1 to F82
 * @param x x offset of segment in the display
 * @param y y offset of segment in the display
 * @constructor
 */
export const Segment = ({
                          pos,
                          x,
                          y
                        }: SegmentProps): JSX.Element => {
  const {caseNum, showSegmentIds} = useAppContext()
  const sector = pos.charAt(0)
  const fill = getFillColor()
  const labelXOffset = pos.length == 2 ? -4 : -6
  const cellNum = Number(pos.substr(1)) + (82 * (pos.charCodeAt(0) - 65))
  const sectorNum = pos.charCodeAt(0) - 65
  const label = showSegmentIds ? '' : cellNum
  const label2 = pos
  const fontSize = 6

  const [open, setOpen] = useState<boolean>(false)



  function getFillColor(): string | undefined {
    let c = Config.sectorEmptyColors.get(sector)
    return c ? c : Config.undefinedColor
  }


  // Pop up a modal dialog on mouse press
  function mousePressed() {
    // don't do anything yet
  }

  // Tool tip to display over a segment
  function toolTip(): string {
    return `Pos: ${pos}`
  }



  function segmentEdges(
  ): Array<JSX.Element> {

      return Config.edgePoints.map((point) => {
        return (
          <SegmentEdge
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




  return (
    <g
      id={pos}
      key={pos}
      className={'segment'}
      fill={fill}
      transform={`translate(${x}, ${y})`}>
      <title>{toolTip()}</title>
      <polygon
        stroke='white'
        strokeWidth='1.0'
        onClick={mousePressed}
        points={Config.segmentPoints}
      />

      {segmentEdges()}

      <text
        x={labelXOffset}
        y='2'
        onClick={mousePressed}
        transform={`rotate(${-Config.sectorAngle(sector)})`}
        fontSize={fontSize}
        fill={'black'}>
        {label}
      </text>


    </g>
  )
}
