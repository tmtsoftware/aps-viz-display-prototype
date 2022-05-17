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

  const {setShowSegmentIds, setCaseNum, setViewSize, setViewX, setViewY, display, setDisplay, setShowSectorColors} = useAppContext()



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
      case 'edgeVectors':
        setDisplay(1)
        break
      case 'edgeTriangles':
        setDisplay(2)
        break
    }
  }


  interface SegmentConfig {
    position: string,
    segmentId?: string
  }

  interface MirrorConfig {
    date: string,
    segments: Array<SegmentConfig>
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
        onSelect={displayMenuOptionSelected}
        mode="inline">
        <SubMenu key="view" title="Display Type">
          <Menu.Item key="edgeVectors">
            Edge Vectors
          </Menu.Item>
          <Menu.Item key="edgeTriangles">
            Edge Triangles
          </Menu.Item>
        </SubMenu>
      </Menu>

    </Sider>

  )
}
