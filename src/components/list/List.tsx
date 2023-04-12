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
import SvgIcon from '@mui/material/SvgIcon'

import { Edit, Delete, Add } from '@mui/icons-material'

import { getEntityData } from '@/services/GetData'
import { IEntitiesInfo } from '@/assets/data/entities'
import { capitalizeFirstLetter } from '@/utils'

import { ReactComponent as Planets } from '@/assets/images/planets.svg'
import { ReactComponent as People } from '@/assets/images/people.svg'
import { ReactComponent as Films } from '@/assets/images/films.svg'
import { ReactComponent as Starships } from '@/assets/images/startships.svg'
import { ReactComponent as Vehicles } from '@/assets/images/vehicles.svg'
import { ReactComponent as Species } from '@/assets/images/species.svg'

import '@/assets/styles/list.css'

const List: FC<{ entityInfo: IEntitiesInfo }> = ({ entityInfo }) => {
  const dispatch = useDispatch()

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
        <SvgIcon></SvgIcon>
        <Typography sx={{ color: theme => theme.palette.primary.main, margin: '0.5rem' }} variant='h4'>
          {entityInfo.title}
        </Typography>

        <Table className='list-table'>
          <TableHead>
            <TableRow>
              {entityInfo.attributes.map((header: string) => (
                <TableCell key={header} className='list-table-header-cell'>
                  {capitalizeFirstLetter(header)}
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
                  {data[header]}
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
