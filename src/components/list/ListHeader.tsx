import React, { FC } from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { convertUnderscoresToSpaces } from '@/utils'

import '@/assets/styles/list.css'

const ListHeader: FC<{ attributes: string[] }> = ({ attributes }) => {
  return (
    <TableHead sx={{ display: 'table-header-group' }}>
      <TableRow>
        {attributes.map((header: string) => (
          <TableCell key={header} className='list-table-header-cell'>
            {convertUnderscoresToSpaces(header)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default ListHeader
