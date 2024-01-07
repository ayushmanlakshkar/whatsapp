import React from 'react'
import Searchcontact from './Searchcontact'
import '../styles/contactscroll.css'
import Contacts from './Contacts'
import { Tabs, Tab, Box, Divider } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CreateGroup from './CreateGroup';
import { setreading } from '../store/slices/reading'

const theme = createTheme();


const Contactscroll = () => {
  const friend_req_options = useSelector(state => state.friend_req)
  const reading = useSelector(state => state.reading)
  const dispatch = useDispatch()
  return (
    <div className='contactscroll'>
      {!friend_req_options.create_group ?
        <><Searchcontact />
          {friend_req_options.friends ? <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', color: 'white' }}>
              <Tabs value={reading.personal ? "personal" : "group"} onChange={(e, value) => { dispatch(setreading(value)) }} centered>
                <Tab value="personal" label="Personal" sx={{ color: 'white' }} />
                <Tab value="group" label="Group" sx={{ color: 'white' }} />
              </Tabs>
            </Box>
          </ThemeProvider> : <></>}
          <Contacts /></>
        : <CreateGroup />}
    </div>
  )
}

export default Contactscroll
