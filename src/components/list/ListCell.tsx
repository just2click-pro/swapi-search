import React, { FC, forwardRef, useImperativeHandle, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as MUIcon from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { Edit, Delete } from '@mui/icons-material'

import { editItem, deleteItem, addItem } from '@/store/reducer'

import { formatTableValues, capitalizeFirstLetter } from '@/utils'

import CommonDialog, { DialogType } from '@/components/commonDialog/CommonDialog'

import { OpenAddDialog } from './List'

interface IconProps {
  icon?: keyof typeof MUIcon
}

const IconComp: React.FC<IconProps> = ({ icon }) => {
  if (!icon) return null

  const Icon = MUIcon[icon]
  return <Icon />
}

interface ListCellProps {
  data: any
  attributes: string[]
}

const ListCell: FC<ListCellProps> = forwardRef<OpenAddDialog, ListCellProps>(({ data, attributes }, ref) => {
  const dispatch = useDispatch()

  const [pageData, setPageData] = useState(data)
  const [dialogState, setDialogState] = useState(false)
  const [dialogType, setDialogType] = useState<DialogType>('update')

  useImperativeHandle(ref, () => ({
    openAddDialog() {
      setDialogType('add')
      openDialog()
    }
  }))

  const openDialog = () => {
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
    setPageData(editedItem)
  }

  const handleDeleteItem = (id: string) => {
    dispatch(deleteItem(id))
    setPageData(pageData.filter((item: any) => item.id !== id))
  }

  return (
    <>
      <TableRow key={pageData.id}>
        {attributes.map((header: string) => (
          <TableCell key={header} className='list-table-cell'>
            {header === 'gender' ? (
              <IconComp
                icon={pageData[header] === 'n/a' ? 'Android' : (capitalizeFirstLetter(pageData[header]) as any)}
              />
            ) : (
              formatTableValues(pageData[header], header)
            )}
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
        attributes={attributes}
        data={data}
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
        id={data.id}
      />
    </>
  )
})

export default ListCell
