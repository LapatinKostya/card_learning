import React, { ChangeEvent, useEffect } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { BackToPackList } from '../../../components/common/BackToPackList/BackToPackList'
import { PATH } from '../../../components/pages/Pages'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { setCardsPackIdToLearnAC } from '../../learn/learnReducer'

import { BasicTable } from './BasicTable/BasicTable'
import { style } from './BasicTable/styleSXForBasicTable'
import s from './CardsMain.module.css'
import {
  createNewCardTC,
  deleteCardTC,
  getCardsTC,
  setCurrentCardsPageAC,
  setCurrentPackIdAC,
  setFilterCardsFromInputSearchAC,
  setPageCardsCountAC,
  updateCardTC,
} from './cardsReducer'
import { FadeMenu } from './FadeMenu/FadeMenu'

export const CardsMain = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.app.user._id)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const page = useAppSelector(state => state.cards.page)
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const packName = useAppSelector(state => state.cards.packName)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const currantPackUserId = useAppSelector(state => state.cards.packUserId)
  const cardPacks = useAppSelector(state => state.cards.cards)
  const searchValue = useAppSelector(state => state.cards.filterSearchValue)
  const sort = useAppSelector(state => state.cards.sortCardsValue)

  const [searchParams, setSearchParams] = useSearchParams()

  const params = Object.fromEntries(searchParams)
  const navigate = useNavigate()

  useEffect(() => {
    if (params.cardsPack_id != null) {
      dispatch(setCurrentPackIdAC(params.cardsPack_id))
    }
  }, [])

  useEffect(() => {
    dispatch(getCardsTC())
  }, [useDebounce(searchValue)])

  useEffect(() => {
    if (cardsPack_id) {
      searchParams.set('cardsPack_id', cardsPack_id)
    }
    setSearchParams(params)
    dispatch(getCardsTC(params))
  }, [
    searchParams.get('cardsPack_id'),
    pageCount,
    page,
    useDebounce(searchValue),
    sort,
    cardsPack_id,
  ])

  //pageCount, page, useDebounce(searchValue), sort, - это убрал из зависимостей
  // useEffect(() => {
  //   !cardPacks?.length && dispatch(setCurrentCardsPageAC(page - 1))
  // }, [totalCount])

  const onChangePagination = (page: number, countPage: number) => {
    dispatch(setPageCardsCountAC(countPage))
    dispatch(setCurrentCardsPageAC(page))
  }

  const addNewCard = () => {
    dispatch(
      createNewCardTC({
        cardsPack_id: params.cardsPack_id,
        question: 'test',
        answer: 'answer',
      })
    )
  }
  const deleteCard = (cardId: string) => {
    dispatch(deleteCardTC(cardId))
  }

  const updateCard = (cardId: string) => {
    dispatch(
      updateCardTC({
        _id: cardId,
        question:
          'What are you think about itWhat areink about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about it',
        answer:
          'I know itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about it',
      })
    )
  }
  const learnToPack = () => {
    dispatch(setCardsPackIdToLearnAC(params.cardsPack_id))
    navigate(PATH.LEARN)
  }
  const inputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterCardsFromInputSearchAC(e.currentTarget.value))
  }

  const addNewCardOrLearnCards =
    myId === currantPackUserId ? (
      <Button variant="contained" sx={style.addNewCard} onClick={addNewCard}>
        <span className={s.btnTitle}>Add new card</span>
      </Button>
    ) : (
      <Button
        variant="contained"
        sx={style.addNewCard}
        onClick={learnToPack}
        disabled={cardPacks?.length === 0}
      >
        <span className={s.btnTitle}>Learn to pack</span>
      </Button>
    )

  const dashboardMenu = myId === currantPackUserId ? <FadeMenu learnPack={learnToPack} /> : null

  return (
    <>
      <BackToPackList />

      <div className={s.packName}>
        <div className={s.packNameTitle}>
          <span className={s.packNameTitleSpan}>{packName}</span>
          {dashboardMenu}
        </div>
        {addNewCardOrLearnCards}
      </div>
      <div className={s.search}>
        <span className={s.searchSpan}>Search</span>
        <TextField
          className={s.input}
          size="small"
          value={searchValue}
          onChange={inputSearch}
          placeholder={'Provide your text'}
          InputProps={{
            startAdornment: (
              <InputAdornment position={'start'}>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton onClick={() => dispatch(setFilterCardsFromInputSearchAC(''))}>
                <CloseIcon />
              </IconButton>
            ),
          }}
        />
      </div>
      <BasicTable deleteCardOnClick={deleteCard} updateCardOnClick={updateCard} />
      {/*{cardPacks?.length !== 0 ? (*/}
      {/*  <UniversalPagination*/}
      {/*    page={page}*/}
      {/*    pageCount={pageCount}*/}
      {/*    totalCount={totalCount}*/}
      {/*    onChange={onChangePagination}*/}
      {/*  />*/}
      {/*) : null}*/}
    </>
  )
}
