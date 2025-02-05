import React, {useState} from 'react'
import {Config} from './Config'
import {useAppContext} from "../AppContext"
import {EdgeVector} from './EdgeVector'
import {EdgeTriangle} from './EdgeTriangle'

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
  const {caseNum, showSegmentIds, viewSize, setViewSize, setViewX, setViewY, viewX, viewY, edgeDisplay, showSectorColors,
    showBySegmentMaxWhValue, showSegmentTipTilts} = useAppContext()

  const sector = pos.charAt(0)
  const labelXOffset = pos.length == 2 ? -4 : -6
  const cellNum = Number(pos.substr(1)) + (82 * (pos.charCodeAt(0) - 65))
  const sectorNum = pos.charCodeAt(0) - 65
  const label = showSegmentIds ? '' : cellNum
  const label2 = pos
  const fontSize = 6

  const angle = 90;  // this will be passed in
  const color1 = "red"  // this will be passed in
  const color2 = "blue"  // this will be passed in
  const gradientId = "hexGradient" + cellNum;

  // Convert angle to x1, y1, x2, y2 for linearGradient
  // angle needs to be de-rotated from the rotated sector
  const derotateAngleDeg = angle - Config.sectorAngle(sector)
  const derotateAngleRad = derotateAngleDeg * Math.PI/180;
  const x1 = 0.5 + 0.5 * Math.cos(derotateAngleRad);
  const y1 = 0.5 + 0.5 * Math.sin(derotateAngleRad);
  const x2 = 0.5 - 0.5 * Math.cos(derotateAngleRad);
  const y2 = 0.5 - 0.5 * Math.sin(derotateAngleRad);


  const getRandomWhColor = () => {
    const grey = Math.floor(Math.random() * 180) + 75;
    if (grey < 80) return 'red';
    if (grey < 100) return 'orange'
    return `rgb(${grey}, ${grey}, ${grey})`;
  };

  const getTipTiltGradient = () => {
    return "url(#hexGradient" + cellNum + ")";
  };

  const whColor = getRandomWhColor();

  const tipTiltGradient = getTipTiltGradient()

  const fill = getFillColor()

  const [open, setOpen] = useState<boolean>(false)


  function getFillColor(): string | undefined {
    if (showBySegmentMaxWhValue) {
       return whColor;
     }
     if (showSegmentTipTilts) {
        return tipTiltGradient;
      }
      let c = Config.sectorEmptyColors.get(sector)
    return (c && showSectorColors) ? c : Config.undefinedColor
  }


  // Pop up a modal dialog on mouse press
  function mousePressed(event: MouseEvent<SVGTextElement, MouseEvent>) {

    // use nativeEvent X and Y, scaled by viewSize relative to Mirror Diameter
    console.log(event.nativeEvent.clientX)
    console.log("viewSize = " + viewSize)

    var e = document.getElementById("svgImage");
    var dim = e.getBoundingClientRect();
    var x = event.nativeEvent.clientX - dim.left;
    var y = event.nativeEvent.clientY - dim.top;
    console.log("x: "+x+" y:"+y);

    const xfactor = viewSize/(dim.right - dim.left)
    const yfactor = viewSize/(dim.bottom - dim.top + 70) // why we need to add 70 I don't know but it helps y offsetting

    // lets find out the % x and y of the mouse click rather than actual values
    const xScaled = x * xfactor;
    const yScaled = y * yfactor;

    // now convert to what the coordinate will be in our new viewSize

    // when we click we want the place we clicked to remain constant throughout the zoom.

    const newSize = viewSize/2;


    //console.log("clientX = " + clientX)
    //console.log("xscaled = " + xScaled)


    setViewX(xScaled/2 + viewX)
    setViewY(yScaled/2 + viewY)

    // use pos to get the position in the view
    setViewSize(newSize)
  }

  // Tool tip to display over a segment
  function toolTip(): string {
    return `Pos: ${pos}`
  }


  // TODO: this is where we can turn the display off by returning empty
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

  // TODO: this is where we can turn the display off by returning empty
  function edgeTriangles(
  ): Array<JSX.Element> {
      if (edgeDisplay != 2) return []
      else
      return Config.segmentPointsArray.map((point) => {
        return (
          <EdgeTriangle
            key={'A' + point.index}
            index={point.index}
            cellNum={cellNum}
            sectorNum={sectorNum}
            edgepoint1X={point.p1x}
            edgepoint1Y={point.p1y}
            edgepoint2X={point.p2x}
            edgepoint2Y={point.p2y}
          />
        )
      })
  }

//


  return (
    <g
      id={pos}
      key={pos}
      className={'segment'}

      transform={`translate(${x}, ${y})`}>
      <defs>
        <linearGradient id={gradientId}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        >
        <stop offset="0%" stopColor={color1} />
        <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <title>{toolTip()}</title>

      <polygon
        fill={fill}
        stroke='white'
        strokeWidth='1.0'
        onClick={mousePressed}
        points={Config.segmentPoints}
      />

      {edgeVectors()}
      {edgeTriangles()}

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
