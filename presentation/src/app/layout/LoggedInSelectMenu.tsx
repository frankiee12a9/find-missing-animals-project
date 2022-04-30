import React, {useState} from 'react'
import {Button, Menu, Fade, MenuItem} from "@mui/material"
import {Link} from "react-router-dom"
import { logout } from '../../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../store/storeConfig'

export default function LoggedInSelectMenu() {
    const dispatch = useAppDispatch()
    // const {user} = useAppSelector(state => state.auth)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => setAnchorEl(null)

  return (
      <>
          <Button
            color="inherit"
            onClick={handleClick}
              sx={{
                  typography: "h6"
             }}
          > 
          {/* Note: username or email?? */}
              {/* {user?.username}   */}
        </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              {/* TODO: logged in user option */}
              <MenuItem component={Link} to="/">User option</MenuItem>
              <MenuItem onClick={() => {
                  dispatch(logout())
              }}>Logout</MenuItem>
        </Menu>
      </>
  )
}
