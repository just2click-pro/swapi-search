import React, { FC, useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles'

import { getEntityData } from '@/services/GetData'
import { IEntitiesInfo } from '@/assets/data/entities'
import DynamicSvgIcon from '@/components/dynamicSvgIcon/DynamicSvgIcon'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'

import ListHeader from './ListHeader'
import ListCell from './ListCell'

import '@/assets/styles/list.css'

const List: FC<{ entityInfo: IEntitiesInfo }> = ({ entityInfo }) => {
  const theme = useTheme()

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchEntityData = async () => {
      const entityData = await getEntityData(entityInfo.name)

      setData(entityData)
    }

    fetchEntityData()
  }, [])

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
          <ListHeader attributes={entityInfo.attributes} />
        </Table>
        <TableBody>
          {data.map((data: any) => (
            <ListCell data={data} attributes={entityInfo.attributes} />
          ))}
        </TableBody>
      </Paper>
    </Box>
  )
}

export default List
