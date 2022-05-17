import React, {useState} from 'react'
import {Config} from './Config'
import {Data} from './Data'
import {useAppContext} from "../AppContext"

type EdgeTriangleProps = {
  index: number
  cellNum: number
  sectorNum: number
  edgepoint1X: number
  edgepoint1Y: number
  edgepoint2X: number
  edgepoint2Y: number
}

/**
 * Represents edge triangle representation

 * @param x x offset of segment in the display
 * @param y y offset of segment in the display
 * @constructor
 */
export const EdgeTriangle = ({
                          index,
                          cellNum,
                          sectorNum,
                          edgepoint1X,
                          edgepoint1Y,
                          edgepoint2X,
                          edgepoint2Y
                        }: EdgeTriangleProps): JSX.Element => {
  const {showSegmentIds, caseNum} = useAppContext()



// the input configuration will be a value for each edge.  For each edge there are two segments and an angle and a +- direction
// we need to determine for each side of the rectangle, which edge it is and whether it is pointing into the segment or not


    // determine if the edge value points into the segment or not
    // extract information for the 6 edges of this segment

const segmentEdge = Config.edgeData.filter(edge => (edge.plusSeg == cellNum || edge.minusSeg == cellNum) &&
    (edge.angle == currentIndexAngle()) &&  //  match the edge table entry with the same angle
    (edge.minusSeg != 0) && // omit peripheral edges
    ((currentIndexPlusEdge() && (edge.plusSeg == cellNum)) || (!currentIndexPlusEdge() && (edge.minusSeg == cellNum))))


// segment 25 should have one line going into it from the top

  function computeColor() {
    if (segmentEdge.length == 1) {

      const edgeNum = segmentEdge[0].edge
      const value = Data.getEdgeValues(caseNum)[edgeNum-1] // values index from 0, edgeNum index from 1

      // now decide which to display depending on plus or minus edge
      // TODO return number that will reflect the color used
      return rgb(-0.1, 1.0, value)
    } else {
     return "0"  // return no color
    }
  }

  function rgb(minimum: number, maximum: number, value: number) {

      const f = (value-minimum) / (maximum - minimum)

      var r,g,b
      const a=(1-f)/0.2;
      const X=Math.floor(a);
      const Y=Math.floor(255*(a-X));
      switch(X)
      {
        case 0: r=255;g=Y;b=128;break;
        case 1: r=255-Y;g=255;b=128;break;
        case 2: r=Y;g=128;b=255;break;
        case 3: r=255;g=128;b=255;break;
        case 4: r=128;g=255;b=Y;break;
        case 5: r=128;g=255-Y;b=255;break;

      }

      return "rgb(" + r + ", " + g + ", " + b + ")"
  }

  const color = computeColor()

 function render() {

    if (segmentEdge.length == 1 && color != "0") {
      return true
    } else {
      return false
    }
  }


  // this function works for sector A.  Sector must be considered.
  function currentIndexAngle() {
    const rotatedIndex = (index - sectorNum + 6) % 6

    if (rotatedIndex == 0 || rotatedIndex == 3) return -60
    else if (rotatedIndex == 1 || rotatedIndex == 4) return 60
    else return 0
  }

  // returns true if the current edge is positive into this segment
  // plus segment is 4 minus segment is 1
  function currentIndexPlusEdge() {
    const rotatedIndex = (index - sectorNum + 6) % 6
    return (rotatedIndex % 2 != 0)
  }


  // fill a map of all segments to each edge number they contain

  // index:  0 = upper right, 1 = lower right, 2 = bottom, 3 = lower left, 4 = upper left, 5 = top
  // sector: 0 = no rotation, 1 = segment rotated by -60 degrees, etc

  //console.log("Cell Num = " + cellNum + ",segmentEdges = " + segmentEdges[cellNum])


  return (

      <g className='edgePoints'>
          {render() &&
          <polygon
            fill={color}
            stroke='red'
            strokeWidth='1.0'
            points={`0, 0, ${edgepoint1X}, ${edgepoint1Y}, ${edgepoint2X}, ${edgepoint2Y}`}
            style={{strokeOpacity: 0}}
          />}

      </g>

  )


}
