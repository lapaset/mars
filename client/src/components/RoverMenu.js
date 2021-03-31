import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Menu, MenuItem } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'

const RoverMenu = ({ rover, setRover }) => {
  const [menuAnchor, setMenuAnchor] = useState(null)

  const options = [
    { label: 'Curiosity', value: 'curiosity' },
    { label: 'Opportunity', value: 'opportunity' },
    { label: 'Spirit', value: 'spirit' },
  ]

  const handleOpen = (event) => setMenuAnchor(event.currentTarget)
  const handleClose = () => setMenuAnchor(null)
  const handleClick = (r) => {
    if (r === rover) return
    handleClose()
    setRover(r)
  }
  return (
    <>
      <IconButton aria-label="more" aria-controls="menu" aria-haspopup="true" onClick={handleOpen}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={menuAnchor}
        keepMounted
        open={menuAnchor !== null}
        onClose={handleClose}
      >
        {options.map((o) => (
          <MenuItem key={o.value} onClick={() => handleClick(o.value)} selected={o.value === rover}>
            {o.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

RoverMenu.propTypes = {
  rover: PropTypes.string.isRequired,
  setRover: PropTypes.func.isRequired,
}

export default RoverMenu
