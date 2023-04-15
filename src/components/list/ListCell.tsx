import React, { FC, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { Edit, Delete, Add } from '@mui/icons-material'

import { editItem, deleteItem, addItem } from '@/store/reducer'

import { formatTableValues } from '@/utils'
import CommonDialog, { DialogType } from '@/components/commonDialog/CommonDialog'

const ListCell: FC<{ data: any; attributes: string[] }> = ({ data, attributes }) => {
  const dispatch = useDispatch()

  const [pageData, setPageData] = useState(data)
  const [dialogState, setDialogState] = useState(false)
  const [dialogType, setDialogType] = useState<DialogType>('add')

  const openDialog = (data?: React.SetStateAction<null>) => {
    setDialogState(true)
  }

  const closeDialog = () => {
    setDialogState(false)
  }

  const handleAddItem = (item: any) => {
    dispatch(addItem(item))
    setPageData([...pageData, item])
    closeDialog()
  }

  const handleEditItem = (id: string, updates: any) => {
    const editedItem = {
      id,
      ...updates
    }

    dispatch(editItem(editedItem))
    setPageData(pageData.map((item: any) => (item.id === id ? editedItem : item)))
  }

  const handleDeleteItem = (id: string) => {
    dispatch(deleteItem(id))
    setPageData(pageData.filter((item: any) => item.id !== id))
  }

  return (
    <>
      <TableRow key={data.id}>
        {attributes.map((header: string) => (
          <TableCell key={header} className='list-table-cell'>
            {formatTableValues(data[header])}
          </TableCell>
        ))}
        <TableCell>
          <IconButton
            className='list-table-icon'
            onClick={() => {
              setDialogType('update')
              openDialog()
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            className='list-table-icon'
            onClick={() => {
              setDialogType('add')
              openDialog()
            }}
          >
            <Add />
          </IconButton>
          <IconButton
            className='list-table-icon'
            onClick={() => {
              setDialogType('delete')
              openDialog()
            }}
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
      <CommonDialog
        type={dialogType}
        open={dialogState}
        close={closeDialog}
        attributes={data.attributes}
        data={data}
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
        id={data.id}
      />
    </>
  )
}

export default ListCell
