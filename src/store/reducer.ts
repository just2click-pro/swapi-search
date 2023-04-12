import { ActionType } from './constants'

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

const reducer = (state = initialState, action: Action) => {
  const { type, payload } = action

  switch (type) {
    case ActionType.ADD_ITEM:
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
