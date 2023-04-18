import React, { FC, useState, useEffect } from 'react'

import { TextField } from '@mui/material'

import { convertUnderscoresToSpaces } from '@/utils'

import '@/assets/styles/dialog.css'

const DialogEditData: FC<{
  attributes: string[]
  data: any
  handleChange: (attribute: string, value: string) => void
}> = ({ attributes, data, handleChange }) => {
  const [item, setItem] = useState(data)

  const handleChangeLocal = (attribute: string, value: string) => {
    setItem((prev: any) => ({
      ...prev,
      [attribute]: value
    }))

    handleChange(attribute, value)
  }

  return (
    <>
      {attributes.map(attribute => (
        <TextField
          sx={{ margin: '0.5rem', width: '47%' }}
          required
          key={attribute}
          className='text-field'
          label={convertUnderscoresToSpaces(attribute)}
          placeholder={convertUnderscoresToSpaces(attribute)}
          inputProps={{ maxLength: 15 }}
          value={item[attribute] ? item[attribute] : ''}
          onChange={e => handleChangeLocal(attribute, e.target.value)}
        />
      ))}
    </>
  )
}

export default DialogEditData
