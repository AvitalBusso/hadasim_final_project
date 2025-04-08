import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';

import { getAllOwnerOrders, updateOrderStatusToCompleted } from '../slices/orderSlice';
import { getAllOrders, updateOrderStatusToProcess } from '../slices/orderSlice';

const statusColors = {
  PENDING: 'rgba(227, 166, 166, 0.9)',
  IN_PROCESS: 'rgba(255, 204, 128, 0.9)',
  COMPLETED: 'rgba(152, 225, 156, 0.9)',
};

const Orders = ({ role }) => {

  const dispatch = useDispatch();
  const ordersList = useSelector((state) => state.order.ordersList || []);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.supplier);

  useEffect(() => {
    if (role === "Manager") {
      dispatch(getAllOwnerOrders()); // טעינת ההזמנות
    } else {
      dispatch(getAllOrders(currentUser.id));
    }
  }, [dispatch]);

  useEffect(() => {
    const filtered = statusFilter === 'ALL'
      ? ordersList
      : ordersList.filter(order => order?.status === statusFilter);

    setFilteredOrders(filtered);
  }, [statusFilter, ordersList]);

  return (
    <>
      <Box sx={{ maxWidth: '900px', margin: 'auto', padding: 3, }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#a1e5c9' }}>
            My Orders
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 3 }}>
          {['ALL', 'PENDING', 'IN_PROCESS', 'COMPLETED'].map(status => (
            <Button
              key={status}
              variant="contained"
              onClick={() => setStatusFilter(status)}
              sx={{
                backgroundColor: statusFilter === status ? '#a1e5c9' : '#B0BEC5',
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
              {status.replace('_', ' ')}
            </Button>
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Grid container spacing={3} justifyContent="center">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <Grid item xs={12} sm={6} md={4} key={order.id}>
                  <Paper sx={{ padding: 2, backgroundColor: statusColors[order.status] || '#E0E0E0', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#37474F' }}>
                      {order.product.name}
                    </Typography>

                    <Box sx={{ marginTop: 2 }}>
                      <Typography variant="body2" sx={{ color: '#37474F' }}>
                        Quantity: {order.quantity}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#37474F' }}>
                        Unit Price: ${order.product.price}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#37474F' }}>
                        Total Price: ${order.quantity * order.product.price}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#37474F' }}>
                        Status: {order.status}
                      </Typography>
                      {role === "Manager" && (
                        <Typography variant="body2" sx={{ color: '#37474F' }}>
                          Company Name: {order.supplier.companyName}
                        </Typography>
                      )}
                      <Typography variant="body2" sx={{ width: '100%', textAlign: 'center', color: '#37474F' }}>
                        Order Date: {new Date(order.dateTime).toLocaleDateString()}
                      </Typography>
                    </Box>
                    {role === "Manager" && order.status === 'IN_PROCESS' && (
                      <Button
                        variant="contained"
                        color="#B0BEC5"
                        onClick={() => dispatch(updateOrderStatusToCompleted(order.id))}
                        sx={{ marginTop: 2 }}
                      >
                        Complete Order
                      </Button>
                    )}
                    {role !== "Manager" && order.status === 'PENDING' && (
                      <Button
                        variant="contained"
                        color="#B0BEC5"
                        sx={{ marginTop: 2 }}
                        onClick={() => dispatch(updateOrderStatusToProcess(order.id))}
                      >
                        Start Processing
                      </Button>
                    )}
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" color="textSecondary" align="center">No Orders Found</Typography>
            )}
          </Grid>
        </motion.div>
      </Box>
    </>
  )
}

export default Orders