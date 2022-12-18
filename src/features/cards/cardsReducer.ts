import { setAppStatusAC } from '../../app/appReducer'
import { AppRootStateType, AppThunkDispatch } from '../../app/store'

import { cardsApi, CardType, GetCardsResponseType } from './CardsApi'

const cardsInitialState = {
  cards: null as CardType[] | null,
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 5,
  packUserId: '639de5a09aa32653302bd563',
  currentPackId: '',
  sortCardsValue: '0updated',
  filterSearchValue: '',
}

export type CardsStateType = typeof cardsInitialState
export type CardsActionType = ReturnType<typeof setCardsAC> | ReturnType<typeof setCurrentPackAC>

export const cardsReducer = (
  state: CardsStateType = cardsInitialState,
  action: CardsActionType
): CardsStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return {
        ...state,
        cards: action.data.cards,
        cardsTotalCount: action.data.cardsTotalCount,
        maxGrade: action.data.maxGrade,
        minGrade: action.data.minGrade,
        page: action.data.page,
        pageCount: action.data.pageCount,
        packUserId: action.data.packUserId,
      }
    case 'CARDS/SET-CURRENT-PACK':
      return {
        ...state,
        currentPackId: action.id,
      }
    default:
      return state
  }
}

export const setCardsAC = (data: GetCardsResponseType) => {
  return {
    type: 'CARDS/SET-CARDS',
    data,
  } as const
}

export const setCurrentPackAC = (id: string) => {
  return { type: 'CARDS/SET-CURRENT-PACK', id } as const
}

export const getCardsTC =
  () => async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const cardsPack_id = getState().cards.currentPackId
    const page = getState().cards.page
    const pageCount = 1
    const cardQuestion = getState().cards.filterSearchValue
    const sortCards = getState().cards.sortCardsValue

    try {
      const res = await cardsApi.getCards({
        cardsPack_id,
        page,
        pageCount,
        cardQuestion,
        sortCards,
      })

      console.log(res)
      dispatch(setCardsAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
      console.log(err)
    }
  }
