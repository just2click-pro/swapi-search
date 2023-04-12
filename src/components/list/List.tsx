import React, { FC, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import { useTheme } from '@mui/material/styles'

import { Edit, Delete, Add } from '@mui/icons-material'

import { getEntityData } from '@/services/GetData'
import { IEntitiesInfo } from '@/assets/data/entities'
import DynamicSvgIcon from '@/components/dynamicSvgIcon/DynamicSvgIcon'

import { capitalizeFirstLetter } from '@/utils'

import '@/assets/styles/list.css'

const List: FC<{ entityInfo: IEntitiesInfo }> = ({ entityInfo }) => {
  const dispatch = useDispatch()
  const theme = useTheme()

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchEntityData = async () => {
      const entityData = await getEntityData(entityInfo.name)

      setData(entityData)
    }

    fetchEntityData()
  }, [])

  const formatDifferentValues = (value: string): string => {
    if (!value) return ''
    const isNumeric = /^\d+$/.test(value)

    if (isNumeric) {
      return parseInt(value).toLocaleString('en-US')
    }

    return capitalizeFirstLetter(value)
  }

  const formatHeader = (value: string): string => {
    if (!value) return ''
    const withSpaces = value.replaceAll('_', ' ')
    return capitalizeFirstLetter(withSpaces)
  }

  return (
    <Box>
      <Paper className='list-paper'>
        <Box sx={{ display: 'flex' }}>
          <DynamicSvgIcon
            iconName={entityInfo.name}
            svgProps={{
              width: 32,
              height: 32,
              fill: `${theme.palette.primary.contrastText}`,
              stroke: `${theme.palette.primary.main}`
            }}
            wrappedStyle='list-entity-icon'
          />
          <Typography sx={{ color: theme => theme.palette.primary.main, margin: '0.5rem' }} variant='h4'>
            {entityInfo.title}
          </Typography>
        </Box>

        <Table className='list-table'>
          <TableHead>
            <TableRow>
              {entityInfo.attributes.map((header: string) => (
                <TableCell key={header} className='list-table-header-cell'>
                  {formatHeader(header)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
        <TableBody>
          {data.map((data: any) => (
            <TableRow key={data.id}>
              {entityInfo.attributes.map((header: string) => (
                <TableCell key={header} className='list-table-cell'>
                  {formatDifferentValues(data[header])}
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
          ))}
        </TableBody>
      </Paper>
    </Box>
  )
}

export default List
