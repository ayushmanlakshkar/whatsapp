import React, { useState } from 'react'
import Sing_up from './Sing_up';
import Login_in from './Login_in';
import { Tabs, Tab, Box, Divider } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../styles/authentication.css'

const theme = createTheme(); 

function Authentication() {
  const [formoption, setFormoption] = useState("login")

  const handleChange = (e,value) => {
    setFormoption(value)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='top_half'></div>
      <div className='bottom_half'></div>
      <div className='middle'>
        <div className='options'>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={formoption} onChange={handleChange} centered>
              <Tab value = "login" label="Sing In" />
              <Tab value = "singup" label="Sing Up" />
            </Tabs>
          </Box>
        </div>
        <Divider variant='middle' color='grey'/>
        <div className='form'>
          {formoption === "login" ? <Login_in/> : <Sing_up/>}
        </div>
      </div>
      </ThemeProvider>
  )
}

export default Authentication
