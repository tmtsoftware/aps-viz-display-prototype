import React from 'react'
import {PageHeader} from "antd"
import {Logout, Login} from '@tmtsoftware/esw-ts'
import {useAppContext} from "../AppContext"

export const Topbar = (): JSX.Element => {

  const {auth, authEnabled} = useAppContext()

  const makeLoginItem = () => {
    return (!auth ? (
      <span>Loading...</span>
    ) : auth.isAuthenticated() ? (
      <Logout/>
    ) : (
      <Login/>
    ))
  }

  return (
    <PageHeader
      style={{backgroundColor: '#b2c4db', height: '0px', paddingTop: '0'}}
      ghost={true}
      className={'topbarPageHeader'}
    >
    </PageHeader>
  )
}
