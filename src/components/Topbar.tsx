import React from 'react'
import {PageHeader} from "antd"
import {useAppContext} from "../AppContext"

export const Topbar = (): JSX.Element => {


  return (
    <PageHeader
      style={{backgroundColor: '#b2c4db', height: '0px', paddingTop: '0'}}
      ghost={true}
      className={'topbarPageHeader'}
    >
    </PageHeader>
  )
}
