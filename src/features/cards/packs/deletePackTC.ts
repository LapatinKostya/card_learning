import { AxiosError } from 'axios'

import { packsApi, ParamsForGetPacks } from '../../../api/PacksApi'
import { setAppStatusAC } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../utils/error-utils'

import { getPacksTC } from './getPacksTC'

export const deletePackTC =
  (id: string, params: ParamsForGetPacks): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsApi.deletePack(id)

      dispatch(getPacksTC(params))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
