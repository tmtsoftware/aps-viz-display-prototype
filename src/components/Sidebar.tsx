import React, {ChangeEvent, useEffect, useState} from 'react'
import {DatePicker, Form, Input, Layout, Menu, Modal, Popconfirm, Progress, Select, Upload} from "antd";
import {MenuInfo, SelectInfo} from 'rc-menu/lib/interface';
import {SegmentData, SegmentToM1Pos} from "./SegmentData";
import SubMenu from "antd/es/menu/SubMenu";
import { format } from 'date-fns'

import moment from "moment";
import ValueType = WebAssembly.ValueType;
import {useAppContext} from "../AppContext"

const {Sider} = Layout;

export const Sidebar = (): JSX.Element => {

  const {updateDisplay, setViewMode, setShowSegmentIds, setShowSpares, auth, authEnabled, posMap, mostRecentChange} = useAppContext()



  function isAuthenticated(): boolean {
    if (authEnabled) {
      if (auth)
        return (auth.isAuthenticated() || false)
      return false
    } else return true
  }



  function viewMenuOptionSelected(info: SelectInfo) {
    switch (info.key) {
      case 'hideSegmentIds':
        setShowSegmentIds(true)
        break
      case 'showSpares':
        setShowSpares(true)
        break
    }
  }

  function viewMenuOptionDeselected(info: SelectInfo) {
    switch (info.key) {
      case 'hideSegmentIds':
        setShowSegmentIds(false)
        break
      case 'showSpares':
        setShowSpares(false)
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
            Hide Segment IDs
          </Menu.Item>
          <Menu.Item key="showSpares">
            Zoom
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}
