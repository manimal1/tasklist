import { FC, useState, Fragment } from 'react';
import { Box, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAppSelector } from 'state/hooks';
import { getUserName, getUserImage } from 'state/_slices/userSlice';

export const TaskListHeader: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userName = useAppSelector(getUserName);
  const userImage = useAppSelector(getUserImage);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const boxWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '80px',
    pl: 3,
    pr: 2,
  };

  const menuPaperStyles = {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  };

  return (
    <Fragment>
      <Box sx={boxWrapperStyles}>
        <Box display="flex">
          <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
            <img src={userImage} style={{ width: 48, height: 32 }} />
          </Avatar>
          <Typography variant="h5">{`${userName}'s task list`}</Typography>
        </Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: menuPaperStyles,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
