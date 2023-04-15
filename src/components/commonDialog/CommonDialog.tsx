import React, { FC, useState, useEffect } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

export type DialogType = 'add' | 'update' | 'delete'

const CommonDialog: FC<{
  type: DialogType
  attributes: string[]
  data?: any
  open: boolean
  close: Function
  handleAddItem: Function
  handleEditItem: Function
  handleDeleteItem: Function
  id?: string
}> = ({ type, attributes, data, open, close, handleAddItem, handleEditItem, handleDeleteItem, id }) => {
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
  const [newItem, setNewItem] = useState(initialState)
  const [editedData, setEditedDate] = useState()

  useEffect(() => {
    setEditedDate(data)
  }, [data])

  useEffect(() => {
    switch (type) {
      case 'add':
        setTitle('Create a new item')
        break
      case 'update':
        setTitle('Update an item')
        break
      case 'delete':
        setTitle('Confirm delete')
        setSubmitButtonText('Delete')
        break
    }
  }, [type])

  const handleChange = (attr: string, value: string) => {
    if (type === 'add') {
      setNewItem(prev => ({
        ...prev,
        [attr]: value
      }))
    }
  }

  const handleSubmit = () => {
    switch (type) {
      case 'add':
        handleAddItem(newItem)
        setNewItem(newItem)
        break
      case 'update':
        handleEditItem(id, editedData)
        close()
        break
      case 'delete':
        handleDeleteItem(data.id)
        close()
    }
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>{submitButtonText}</Button>
        <Button onClick={() => close()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CommonDialog
