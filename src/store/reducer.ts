import { ActionType } from './constants'
import { v4 as uuid } from 'uuid'

export interface IItem {
  id: string
  name: string
}

export interface Action {
  type: ActionType
  payload: IItem
}

export interface State {
  items: Array<IItem>
}

const initialState = {
  items: Array<IItem>()
}

export const addItem = (item: any) => ({
  type: ActionType.ADD_ITEM,
  payload: item
})

export const editItem = (item: any) => ({
  type: ActionType.EDIT_ITEM,
  payload: item
})

export const deleteItem = (id: string) => ({
  type: ActionType.DELETE_ITEM,
  payload: id
})

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action

  switch (type) {
    case ActionType.ADD_ITEM:
      payload.id = uuid()
      return {
        ...state,
        items: [...state.items, payload]
      }
    case ActionType.EDIT_ITEM:
      const updatedItems = state.items.map((item: IItem) => (item.id === action.payload.id ? action.payload : item))
      return {
        ...state,
        items: updatedItems
      }
    case ActionType.DELETE_ITEM:
      const remainingItems = state.items.filter((item: IItem) => item.id !== action.payload.id)
      return {
        ...state,
        items: remainingItems
      }
    default:
      return state
  }
}

export default reducer
