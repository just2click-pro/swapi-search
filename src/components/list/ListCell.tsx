import React, { FC } from 'react'

import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { Edit, Delete, Add } from '@mui/icons-material'

import { formatTableValues } from '@/utils'

const ListCell: FC<{ data: any; attributes: string[] }> = ({ data, attributes }) => {
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
