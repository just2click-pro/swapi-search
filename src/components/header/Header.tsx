import { FC } from 'react'

import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'

import { ReactComponent as Logo } from '@/assets/images/planets.svg'
import DarkModeToggle from './DarkModeToggle'

import '@/assets/styles/header.css'

const Header: FC = () => {
  return (
    <AppBar position='fixed' className='app-header'>
      <Container maxWidth='xl'>
        <Toolbar sx={{ color: 'primary.contrastText' }}>
          <SvgIcon className='app-header__logo'>
            <Logo />
          </SvgIcon>
          <Typography variant='h6' noWrap component='a' href='/' className='app-header__title'>
            Star Wars Search
          </Typography>
          <Box className='app-header__toggle'>
            <DarkModeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
