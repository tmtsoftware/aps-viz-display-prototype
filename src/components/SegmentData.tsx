// These should match the JSON output of the classes on the server side in EswSegmentData.scala
export class SegmentData {
  // TODO: Configure
  static baseUri = 'http://localhost:9192'
}

/**
 * The object returned from the server for each segment
 */
export interface SegmentToM1Pos {
  date: string
  maybeId?: string
  position: string
}



