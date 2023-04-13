import React, { FC, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'

import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { Edit, Delete, Add } from '@mui/icons-material'

import { editItem, deleteItem, addItem } from '@/store/reducer'

import { formatTableValues } from '@/utils'

const ListCell: FC<{ data: any; attributes: string[] }> = ({ data, attributes }) => {
  const dispatch = useDispatch()

  const [pageData, setPageData] = useState(data)

  const [createFormOpenState, setCreateFormOpenState] = useState(false)
  const [editFormOpenState, setEditFormOpenState] = useState(false)
  const [deleteFormOpenState, setDeleteFormOpenState] = useState(false)

  const [selectedRowToEdit, setSelectedRowToEdit] = useState(null)
  const [selectedRowToDelete, setSelectedRowToDelete] = useState(null)

  const openCreateFormState = () => {
    setCreateFormOpenState(true)
  }

  const closeCreateFormState = () => {
    setCreateFormOpenState(false)
  }

  const callAddItem = (item: any) => {
    const newItem = {
      id: uuid(),
      ...item
    }

    dispatch(addItem(newItem))
    setPageData([...pageData, newItem])
    closeCreateFormState()
  }

  const openEditFormState = (data: React.SetStateAction<null>) => {
    setSelectedRowToEdit(data)
    setEditFormOpenState(true)
  }

  const closeEditFormState = () => {
    setSelectedRowToEdit(null)
    setEditFormOpenState(false)
  }

  const callEditItem = (id: string, updates: any) => {
    const editedItem = {
      id,
      ...updates
    }

    dispatch(editItem(editedItem))
    setPageData(pageData.map((item: any) => (item.id === id ? editedItem : item)))
  }

  const openDeleteFormState = (data: React.SetStateAction<null>) => {
    setSelectedRowToDelete(data)
    setDeleteFormOpenState(true)
  }

  const closeDeleteFormState = () => {
    setSelectedRowToDelete(null)
    setDeleteFormOpenState(false)
  }

  const callDeleteItem = (id: string) => {
    dispatch(deleteItem(id))
    setPageData(pageData.filter((item: any) => item.id !== id))
  }

  return (
    <TableRow key={data.id}>
      {attributes.map((header: string) => (
        <TableCell key={header} className='list-table-cell'>
          {formatTableValues(data[header])}
        </TableCell>
      ))}
      <TableCell>
        <IconButton className='list-table-icon'>
          <Edit />
        </IconButton>
        <IconButton className='list-table-icon'>
          <Add />
        </IconButton>
        <IconButton className='list-table-icon'>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ListCell
