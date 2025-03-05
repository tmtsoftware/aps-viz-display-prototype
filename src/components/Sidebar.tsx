import React, {ChangeEvent, useEffect, useState} from 'react'
import {DatePicker, Form, Input, Layout, Menu, Modal, Popconfirm, Progress, Select, Dropdown, message, Space} from "antd";
import {MenuInfo, SelectInfo} from 'rc-menu/lib/interface';
import SubMenu from "antd/es/menu/SubMenu";
import { DownOutlined } from '@ant-design/icons';
import { format } from 'date-fns'
import {Config} from './Config'

import moment from "moment";
import ValueType = WebAssembly.ValueType;
import {useAppContext} from "../AppContext"

const {Sider} = Layout;

export const Sidebar = (): JSX.Element => {

  const {setShowSegmentIds, setCaseNum, setViewSize, setViewX, setViewY, display, setDisplay, edgeDisplay, setEdgeDisplay,
  showVectorFieldPlot, setShowVectorFieldPlot, showSurfacePlot, setShowSurfacePlot, showWhCircles, setShowWhCircles, setShowSectorColors,
  setShowBySegmentMaxWhValue, showBySegmentMaxWhValue, setShowSegmentTipTiltsFM, showSegmentTipTiltsFM, setShowSegmentTipTiltsRand,
  showSegmentTipTiltsRand, setShowSegmentTipTiltPistonsFM, showSegmentTipTiltPistonsFM, setShowSegmentPistonsFM, showSegmentPistonsFM,
  setShowSegmentArrows, showSegmentArrows} = useAppContext()


  function viewMenuOptionSelected(info: SelectInfo) {
    switch (info.key) {
      case 'hideSegmentIds':
        setShowSegmentIds(true)
        break
      case 'zoom':
        setViewX(0)
        setViewY(0)
        setViewSize(Config.mirrorDiameter)
        break
      case 'hideSectorColors':
        setShowSectorColors(false)
        break
      case 'displayArrows':
        setShowSegmentArrows(true)
        break

    }
  }

  function viewMenuOptionDeselected(info: SelectInfo) {
    switch (info.key) {
      case 'hideSegmentIds':
        setShowSegmentIds(false)
        break
      case 'hideSectorColors':
        setShowSectorColors(true)
        break
      case 'zoom':
        setViewX(0)
        setViewY(0)
        setViewSize(Config.mirrorDiameter)
      case 'displayArrows':
        setShowSegmentArrows(false)
        break

    }
  }

 function caseMenuOptionSelected(info: SelectInfo) {
    switch (info.key) {
      case 'loadCase1':
        setCaseNum(1)
        break
      case 'loadCase2':
        setCaseNum(2)
        break
      case 'loadCase3':
        setCaseNum(3)
        break
      case 'loadCase4':
        setCaseNum(4)
        break
      case 'loadCase5':
        setCaseNum(5)
        break
      case 'loadCase6':
        setCaseNum(6)
        break
      case 'loadCase7':
        setCaseNum(7)
        break
    }
  }

 function displayMenuOptionSelected(info: SelectInfo) {
    switch (info.key) {
      case 'mirror':
        setDisplay(1)
        break
      case 'segments':
         setDisplay(2)
         break
       case 'singleSegment':
          setDisplay(3)
          break
      }
  }

 function edgeDisplayMenuOptionSelected(info: SelectInfo) {
    switch (info.key) {
      case 'edgeVectors':
        setEdgeDisplay(1)
        break
      case 'edgeTriangles':
        setEdgeDisplay(2)
        break
    }
  }

 function segmentDisplayMenuOptionSelected(info: SelectInfo) {
    switch (info.key) {
      case 'vectorFieldPlot':
        setShowVectorFieldPlot(true)
        break
      case 'surfacePlot':
        setShowSurfacePlot(true)
        break
      case 'whCircles':
        setShowWhCircles(true)
        break
    }
  }

 function segmentDisplayMenuOptionDeselected(info: SelectInfo) {
    switch (info.key) {
      case 'vectorFieldPlot':
        setShowVectorFieldPlot(false)
        break
      case 'surfacePlot':
         setShowSurfacePlot(false)
         break
     case 'whCircles':
        setShowWhCircles(false)
        break
    }
  }

function m1DisplayMenuOptionSelected(info: SelectInfo) {
    switch (info.key) {
      case 'whMaxValues':
        setShowBySegmentMaxWhValue(true)
        setShowSegmentTipTiltsFM(false)
        setShowSegmentTipTiltPistonsFM(false)
        setShowSegmentPistonsFM(false)
        setShowSegmentTipTiltsRand(false)
        break
      case 'tiptiltDisplayFM':
        setShowBySegmentMaxWhValue(false)
        setShowSegmentTipTiltsFM(true)
        setShowSegmentTipTiltPistonsFM(false)
        setShowSegmentPistonsFM(false)
        setShowSegmentTipTiltsRand(false)
        break
      case 'tiptiltpistonDisplayFM':
        setShowBySegmentMaxWhValue(false)
        setShowSegmentTipTiltsFM(false)
        setShowSegmentTipTiltPistonsFM(true)
        setShowSegmentPistonsFM(false)
        setShowSegmentTipTiltsRand(false)
        break
      case 'pistonDisplayFM':
        setShowBySegmentMaxWhValue(false)
        setShowSegmentTipTiltsFM(false)
        setShowSegmentTipTiltPistonsFM(false)
        setShowSegmentPistonsFM(true)
        setShowSegmentTipTiltsRand(false)
        break
      case 'tiptiltDisplayRand':
        setShowBySegmentMaxWhValue(false)
        setShowSegmentTipTiltsFM(false)
        setShowSegmentTipTiltPistonsFM(false)
        setShowSegmentPistonsFM(false)
        setShowSegmentTipTiltsRand(true)
        break
    }
  }

 function m1DisplayMenuOptionDeselected(info: SelectInfo) {
    switch (info.key) {
      case 'whMaxValues':
        setShowBySegmentMaxWhValue(false)
        break
     case 'tiptiltDisplayFM':
        setShowSegmentTipTiltsFM(false)
        break
      case 'tiptiltpistonDisplayFM':
        setShowSegmentTipTiltPistonsFM(false)
        break
     case 'pistonDisplayFM':
        setShowSegmentPistonsFM(false)
        break
      case 'tiptiltDisplayRand':
        setShowSegmentTipTiltsRand(false)
        break
    }
  }


  return (
    <Sider>
      <Menu
        multiple={true}
        theme="dark"
        defaultOpenKeys={['view']}
        onSelect={viewMenuOptionSelected}
        onDeselect={viewMenuOptionDeselected}
        mode="inline">
        <SubMenu key="view" title="View">
          <Menu.Item key="hideSegmentIds">
            Hide Cell Numbers
          </Menu.Item>
          <Menu.Item key="displayArrows">
            Display Arrows
          </Menu.Item>
          <Menu.Item key="hideSectorColors">
            Hide Sector Colors
          </Menu.Item>
          <Menu.Item key="zoom">
            Zoom Out
          </Menu.Item>
        </SubMenu>
      </Menu>

      <Menu
        multiple={false}
        theme="dark"
        defaultOpenKeys={['view']}
        onSelect={displayMenuOptionSelected}
        mode="inline">
        <SubMenu key="view" title="Display Type">
          <Menu.Item key="mirror">
            Primary Mirror
          </Menu.Item>
          <Menu.Item key="segments">
             Individual Segments
           </Menu.Item>
           <Menu.Item key="singleSegment">
              Single Segment
            </Menu.Item>
          </SubMenu>
      </Menu>

      <Menu
        multiple={false}
        theme="dark"
        defaultOpenKeys={['view']}
        onSelect={caseMenuOptionSelected}
        mode="inline">
        <SubMenu key="view" title="Edge Data Options">
          <Menu.Item key="loadCase1">
            Raised Cluster
          </Menu.Item>
          <Menu.Item key="loadCase2">
             3 Raised, 3 Lowered
           </Menu.Item>
         <Menu.Item key="loadCase3">
            Left-Right Gradient
          </Menu.Item>
         <Menu.Item key="loadCase4">
            Cone Gradient
          </Menu.Item>
         <Menu.Item key="loadCase5">
            Rings 9,10 Lowered
          </Menu.Item>
         <Menu.Item key="loadCase6">
            Three color mode
          </Menu.Item>
         <Menu.Item key="loadCase7">
            Bad Edges
          </Menu.Item>
        </SubMenu>
      </Menu>

      <Menu
        multiple={false}
        theme="dark"
        defaultOpenKeys={['view']}
        onSelect={edgeDisplayMenuOptionSelected}
        mode="inline">
        <SubMenu key="view" title="Edge Data Display Type">
          <Menu.Item key="edgeVectors">
            Edge Vectors
          </Menu.Item>
          <Menu.Item key="edgeTriangles">
            Edge Triangles
          </Menu.Item>
        </SubMenu>
      </Menu>

      <Menu
        multiple={true}
        theme="dark"
        defaultOpenKeys={['view']}
        onSelect={segmentDisplayMenuOptionSelected}
        onDeselect={segmentDisplayMenuOptionDeselected}
        mode="inline">
        <SubMenu key="view" title="Segment Data Display Type">
          <Menu.Item key="vectorFieldPlot">
            Vector Field Plot
          </Menu.Item>
          <Menu.Item key="surfacePlot">
             Surface Plot
           </Menu.Item>
         <Menu.Item key="whCircles">
            Warping Harness Positions
          </Menu.Item>
        </SubMenu>
      </Menu>

      <Menu
        multiple={false}
        theme="dark"
        defaultOpenKeys={['view']}
        onSelect={m1DisplayMenuOptionSelected}
        onDeselect={m1DisplayMenuOptionDeselected}
        mode="inline">
        <SubMenu key="view" title="M1 Display Type">
          <Menu.Item key="whMaxValues">
            WH Max Values
          </Menu.Item>
          <Menu.Item key="tiptiltDisplayFM">
             M1 Tip/Tilts Focus Mode
           </Menu.Item>
          <Menu.Item key="tiptiltpistonDisplayFM">
              M1 Tip/Tilts/Pistons Focus Mode
            </Menu.Item>
          <Menu.Item key="pistonDisplayFM">
              M1 Pistons Focus Mode
            </Menu.Item>
           <Menu.Item key="tiptiltDisplayRand">
               M1 Tip/Tilts Random
             </Menu.Item>

        </SubMenu>
      </Menu>



    </Sider>

  )
}
