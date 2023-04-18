import React, { FC, useEffect, useState, useRef } from 'react'

import { useTheme } from '@mui/material/styles'

import { getEntityData } from '@/services/GetData'
import { IEntitiesInfo } from '@/assets/data/entities'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'

import { Add } from '@mui/icons-material'

import DynamicSvgIcon from '@/components/dynamicSvgIcon/DynamicSvgIcon'

import ListHeader from './ListHeader'
import ListCell from './ListCell'

import '@/assets/styles/list.css'

export interface OpenAddDialog {
  openAddDialog(): void
}

const List: FC<{ entityInfo: IEntitiesInfo }> = ({ entityInfo }) => {
  const theme = useTheme()
  const listCellRef = useRef<OpenAddDialog>(null)

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchEntityData = async () => {
      const entityData = await getEntityData(entityInfo.name)

      setData(entityData)
    }

    fetchEntityData()
  }, [])

  const handleItemDelete = (id: string) => {
    setData(data.filter((item: any) => item.id !== id))
  }

  return (
    <Box>
      <Paper className='list-paper'>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
          <IconButton
            sx={{ width: '2.5rem', height: '2.5rem', margin: '0.5rem' }}
            onClick={() => {
              listCellRef.current?.openAddDialog()
            }}
          >
            <Add />
          </IconButton>
        </Box>

        <Table className='list-table'>
          <ListHeader attributes={entityInfo.attributes} />
          <TableBody>
            {data.map((item: any) => (
              <ListCell
                key={item.id}
                data={item}
                attributes={entityInfo.attributes}
                ref={listCellRef}
                handleItemDelete={() => handleItemDelete(item.id)}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  )
}

export default List
