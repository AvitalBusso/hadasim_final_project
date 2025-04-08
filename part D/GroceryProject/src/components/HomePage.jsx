import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';
import background from '../images/background.jpg'

import AddOrder from './AddOrder';
import Orders from './Orders';
import AddProducts from './AddProducts';

const HomePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.supplier);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState('Orders');
  const { owner } = useSelector((state) => state.storeOwner);
  const { role } = useParams();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        if (role === "Manager") {
          if (Object.keys(owner).length === 0) {
            navigate("/loginOwner");
          }
        }

      } catch (error) {
        console.error('Error fetching building details:', error);
      }
    };
    fetchData();
  }, [dispatch, owner, currentUser, navigate]);


  const getUserAvatar = () => {
    if (role === "Manager") {
      return owner?.name ? owner.name.charAt(0).toUpperCase() : '';
    } else {
      return currentUser?.companyName ? currentUser.companyName.charAt(0).toUpperCase() : '';
    }
  };
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    handleClose();
    navigate('/');
  };
  const changePage = (value) => {
    setPage('');
    setTimeout(() => {
      setPage(value);
    }, 0);
  };

  const buttons = role === "Manager"
    ? [
      { name: 'My Orders', page: 'Orders' },
      { name: 'Add Order', page: 'AddOrder' }
    ]
    : [
      { name: 'My Orders', page: 'Orders' },
      { name: 'Add Products', page: 'AddProducts' }
    ];

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bgcolor: ' #a1e5c9',
            color: 'white',
            padding: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                SupplyEase
              </Typography>
              <Typography variant="body1" component="h2" sx={{ fontSize: '1rem', color: 'white' }}>
                Smart supply. Easy orders. One platform for all! 🏪🛒✨
              </Typography>
            </motion.div>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{ bgcolor: 'white', color: '#a1e5c9', cursor: 'pointer', marginLeft: 2 }}
              onClick={handleAvatarClick}
            >
              {getUserAvatar()}
            </Avatar>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleLogOut}
              >Log Out</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          overflow: 'hidden',
          height: '100%',
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
        }}>
          <Box sx={{
            flex: 1,
            overflowY: 'scroll',
            padding: 3,
            "&::-webkit-scrollbar": { display: 'none' }
          }}>
            {page === 'Orders' && <Orders role={role} changePage={changePage} />}
            {role === "Manager" ? (
              <>
                {page === 'AddOrder' && <AddOrder changePage={changePage} />}
              </>
            ) : (
              <>
                {page === 'AddProducts' && <AddProducts changePage={changePage} />}
              </>
            )}


          </Box>
          <Box sx={{
            right: 0,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: 1,
            gap: 0.5,
          }}>
            {buttons.map((button) => (
              <button
                key={button.page}
                onClick={() => changePage(button.page)}
                style={{
                  backgroundColor: page === button.page ? '#a1e5c9' : '#B0BEC5',
                  color: 'white',
                  padding: '6px 12px',
                  marginBottom: '5px',
                  borderRadius: '0px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '120px',
                  textAlign: 'center',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                {button.name}
              </button>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HomePage