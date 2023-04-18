import React, { FC, useEffect, useState } from 'react'

import { useTheme } from '@mui/material/styles'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import DialogEditData from './DialogEditData'

import '@/assets/styles/dialog.css'

export type DialogType = 'add' | 'update' | 'delete'

export interface DialogHandleChange {
  editHandleChange(): void
}

const CommonDialog: FC<{
  type: DialogType
  attributes: string[]
  data?: any
  open: boolean
  close: () => void
  handleAddItem: (newItem: any) => void
  handleEditItem: (id: string, editedItem: any) => void
  handleDeleteItem: (id: string) => void
  id?: string
}> = ({ type, attributes, data, open, close, handleAddItem, handleEditItem, handleDeleteItem, id }) => {
  const theme = useTheme()

  // Only relates to 'add' type
  const initialState = attributes
    ? Object.fromEntries(
        attributes.map((attr: string) => {
          return [attr, '']
        })
      )
    : []
  const [title, setTitle] = useState('')
  const [submitButtonText, setSubmitButtonText] = useState('Save')
  const [item, setItem] = useState(initialState)

  useEffect(() => {
    switch (type) {
      case 'add':
        setTitle('Create a new item')
        setItem(initialState)
        break
      case 'update':
        setTitle('Update an item')
        setItem(data)
        break
      case 'delete':
        setTitle('Confirm delete')
        setSubmitButtonText('Delete')
        break
    }
  }, [data, type])

  const handleChange = (attr: string, value: string) => {
    if (type === 'add') {
      setItem((prev: any) => ({ ...prev, [attr]: value }))
    } else if (type === 'update') {
      setItem((prev: any) => ({
        ...prev,
        [attr]: value
      }))
    }
  }

  const handleSubmit = () => {
    switch (type) {
      case 'add':
        handleAddItem(item)
        setItem(item)
        break
      case 'update':
        handleEditItem(data.id, item)
        close()
        break
      case 'delete':
        handleDeleteItem(data.id)
        close()
    }
  }

  return (
    <Dialog open={open} onClose={close}>
      <Container sx={{ backgroundColor: `${theme.palette.primary.contrastText}` }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ width: '100%', padding: 0 }}>
          {type === 'update' ? (
            <DialogEditData attributes={attributes} data={data} handleChange={handleChange} />
          ) : type === 'delete' ? (
            'Are you sure you want to delete this item?'
          ) : (
            <DialogEditData attributes={attributes} data={initialState} handleChange={handleChange} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} className='submit-button'>
            {submitButtonText}
          </Button>
          <Button onClick={() => close()} className='cancel-button'>
            Cancel
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  )
}

export default CommonDialog
