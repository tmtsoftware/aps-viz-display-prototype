import React, {useState} from 'react'
import {Config} from './Config'
import {useAppContext} from "../AppContext"
import {EdgeVector} from './EdgeVector'
import {EdgeTriangle} from './EdgeTriangle'
import {TipTiltData} from './TipTiltData'

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
    showBySegmentMaxWhValue, showSegmentTipTiltsFM, showSegmentTipTiltPistonsFM, showSegmentPistonsFM,
    showSegmentTipTiltsRand, showSegmentArrows} = useAppContext()

  const sector = pos.charAt(0)
  const labelXOffset = pos.length == 2 ? -4 : -6
  const cellNum = Number(pos.substr(1)) + (82 * (pos.charCodeAt(0) - 65))
  const sectorNum = pos.charCodeAt(0) - 65
  const label = showSegmentIds ? '' : cellNum
  const label2 = pos
  const fontSize = 6

  // Tip/Tilt values
  let segmentTtMax, segmentTtMin, segmentTtAngle;
  if (showSegmentTipTiltsFM) {
     segmentTtMax = TipTiltData.segmentTipTiltFM[cellNum-1].maxValue
     segmentTtMin = TipTiltData.segmentTipTiltFM[cellNum-1].minValue
     segmentTtAngle = TipTiltData.segmentTipTiltFM[cellNum-1].angle
  } else if (showSegmentTipTiltPistonsFM) {
     segmentTtMax = TipTiltData.segmentTipTiltPistonFM[cellNum-1].maxValue
     segmentTtMin = TipTiltData.segmentTipTiltPistonFM[cellNum-1].minValue
     segmentTtAngle = TipTiltData.segmentTipTiltPistonFM[cellNum-1].angle
  } else if (showSegmentTipTiltsRand) {
      segmentTtMax = TipTiltData.segmentTipTiltRand[cellNum-1].maxValue
      segmentTtMin = TipTiltData.segmentTipTiltRand[cellNum-1].minValue
      segmentTtAngle = TipTiltData.segmentTipTiltRand[cellNum-1].angle
   } else {
      // piston only
      segmentTtMax = TipTiltData.segmentPistonFM[cellNum-1].maxValue
      segmentTtMin = TipTiltData.segmentPistonFM[cellNum-1].minValue
      segmentTtAngle = TipTiltData.segmentPistonFM[cellNum-1].angle
  }

  const m1TtMax =  TipTiltData.m1TipTiltData.maxValue
  const m1TtMin =  TipTiltData.m1TipTiltData.minValue

  // expansion of length of gradient vector


  //const angle = 90;  // this will be passed in
  const gradientId = "hexGradient" + cellNum;

  // Convert angle to x1, y1, x2, y2 for linearGradient
  // angle needs to be de-rotated from the rotated sector
  const derotateAngleDeg = segmentTtAngle - Config.sectorAngle(sector)
  const derotateAngleRad = derotateAngleDeg * Math.PI/180;
  const x1d = 0.5 + 0.5 * Math.cos(derotateAngleRad);
  const y1d = 0.5 + 0.5 * Math.sin(derotateAngleRad);
  const x2d = 0.5 - 0.5 * Math.cos(derotateAngleRad);
  const y2d = 0.5 - 0.5 * Math.sin(derotateAngleRad);

// to use only a fraction of the gradient: example 25% to 75% we scale the entire vector and translate it

// equation from segmentTT max/min and Mirror TT max/min to gradientScaleup and minPercent
  const scale = (segmentTtMax - segmentTtMin)/(m1TtMax - m1TtMin);
  const gradientScaleup = 1.0/scale;
  const minPercent = segmentTtMin/(m1TtMax - m1TtMin);



// so if we have two points (x1, y1), (x2, y2)
// e.g. we want to scale the line up to 2x its current size, we extend x2, y2 to be 2x the current distance from x1,y1
  const x2u = ((x2d-x1d) * gradientScaleup) + x1d
  const y2u = ((y2d-y1d) * gradientScaleup) + y1d
  const x1u = x1d
  const y1u = y1d

 // and then transform the entire line to land at the 25% (min percent) starting point
  const xtranslate = (x2u - x1u) * minPercent
  const ytranslate = (y2u - y1u) * minPercent
  const x1 = x1u - xtranslate
  const y1 = y1u - ytranslate
  const x2 = x2u - xtranslate
  const y2 = y2u - ytranslate

  // line display - need to change the starting point if the ending point is smaller
  let lineX1, lineX2, lineWidth, pointsString;
  if (showSegmentArrows) {
    lineX1 = -scale * 10.0
    lineX2 = scale * 5.0
    lineWidth = scale * 3.0
    pointsString = scale * 10 + ",0 " + scale * 5 + "," + (scale * -5) + " " + scale * 5 + "," + (scale * 5)
  }

  const getRandomWhColor = () => {
    const grey = Math.floor(Math.random() * 180) + 75;
    if (grey < 80) return 'red';
    if (grey < 100) return 'orange'
    return `rgb(${grey}, ${grey}, ${grey})`;
  };


const interpolateColor = (color1, color2, factor) => {
  const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
};

const getGradientColor = (percent, gradient) => {
  if (percent <= 0) return `rgb(${gradient[0].join(",")})`;
  if (percent >= 1) return `rgb(${gradient[gradient.length - 1].join(",")})`;

  const scaledPercent = percent * (gradient.length - 1);
  const index = Math.floor(scaledPercent);
  const factor = scaledPercent - index;

  return interpolateColor(gradient[index], gradient[index + 1], factor);
};

const gradient = [
  [13, 8, 135],   // Blue
  [106, 0, 168], // Cyan
  [177, 42, 144],   // Green
  [255, 100, 98],   // Red
  [251, 166, 54], // Yellow
];

   const getPistonColor = () => {
      return getGradientColor(segmentTtMin/100.0, gradient);
    };


  const getTipTiltGradient = () => {
    return "url(#hexGradient" + cellNum + ")";
  };

  const whColor = getRandomWhColor();
  const pistonColor = getPistonColor();

  const tipTiltGradient = getTipTiltGradient()

  const fill = getFillColor()

  const [open, setOpen] = useState<boolean>(false)


  function getFillColor(): string | undefined {
    if (showBySegmentMaxWhValue) {
       return whColor;
     }
     if (showSegmentPistonsFM) {
        return pistonColor;
     }
     else if (showSegmentTipTiltsFM || showSegmentTipTiltPistonsFM || showSegmentTipTiltsRand) {
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
             <stop offset="0%" stopColor="#0d0887" />
             <stop offset="25%" stopColor="#6a00a8" />
             <stop offset="50%" stopColor="#b12a90" />
             <stop offset="75%" stopColor="#e16462" />
             <stop offset="100%" stopColor="#fca636" />
        </linearGradient>
      </defs>
      <title>{toolTip()}</title>

      <polygon
        fill={fill}
        stroke='white'
        strokeWidth='0.1'
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


      <line x1={lineX1} y1="0" x2={lineX2} y2="0" stroke="black" stroke-width={lineWidth} transform={`rotate(${-Config.sectorAngle(sector) + segmentTtAngle + 180})`}/>
      <polygon points={pointsString} fill="black" transform={`rotate(${-Config.sectorAngle(sector) + segmentTtAngle + 180})`}/>

// it is only the 10, 5 and 5 that need to change

    </g>
  )
}
