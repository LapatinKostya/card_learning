import React from 'react'

import Avatar from '@mui/material/Avatar'
import Fab from '@mui/material/Fab'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import pencil from '../../../assets/icons/editPencil.png'
import logOut from '../../../assets/icons/logout.svg'
import ava from '../../../assets/img/avatarFish.png'
import SuperEditableSpan from '../../../components/common/SuperEditableSpan/SuperEditableSpan'

import style from './Profile.module.css'
import { updateProfileTC } from './profileReducer'

export const Profile = () => {
  const profile = useAppSelector(state => state.profile)
  const dispatch = useAppDispatch()

  const updateTitleHandler = (name: string) => {
    dispatch(updateProfileTC({ name }))
  }

  return (
    <div className={style.main}>
      <div className={style.title}>Personal Information</div>
      <div className={style.avatar}>
        <Avatar alt="your ava" src={ava} sx={{ width: 96, height: 96 }} />
      </div>
      <div className={style.editSpan}>
        <SuperEditableSpan value={profile.name} onChangeText={updateTitleHandler} />
        <span>
          <img src={pencil} alt="pencil" />
        </span>
      </div>
      <div className={style.email}>{profile.email}</div>
      <Fab
        sx={{ background: '#FCFCFC' }}
        className={style.logOut}
        variant="extended"
        size="medium"
        color="default"
        aria-label="add"
      >
        <span>
          <img src={logOut} alt="logout" />
        </span>
        <span className={style.logoutSpan}>
          Log <span>out</span>
        </span>
      </Fab>
    </div>
  )
}
