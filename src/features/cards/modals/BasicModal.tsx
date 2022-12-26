import * as React from 'react'
import { ReactNode } from 'react'

import { IconButton, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import closeIcon from '../../../assets/icons/iconClose.svg'

import { openModal } from './modalReducer'
import s from './packsModal.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type PropsType = {
  children: ReactNode
}
export const BasicModal: React.FC<PropsType> = ({ children }) => {
  const dispatch = useAppDispatch()
  const title = useAppSelector(state => state.modal.title)

  const handleClose = () => {
    dispatch(openModal(null))
  }

  return (
    <Modal open={!!title} onClose={handleClose}>
      <div className={s.main}>
        <div className={s.header}>
          <Typography className={s.title}>{title}</Typography>
          <IconButton onClick={handleClose}>
            <img src={closeIcon} alt="close" />
          </IconButton>
        </div>
        <div className={s.body}>{children}</div>
      </div>
    </Modal>
  )
}
