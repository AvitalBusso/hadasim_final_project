
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";

import { getAllPeoducts } from "../slices/productSlice";
import { getOwner } from "../slices/storeOwnerSlice";
import { addOrder } from "../slices/orderSlice";

const AddOrder = () => {
  
  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.product);
  const { owner } = useSelector((state) => state.storeOwner);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [showError, setShowError] = useState("");

  useEffect(() => {
    dispatch(getAllPeoducts());
    dispatch(getOwner());
  }, [dispatch]);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setQuantity("");
    setShowError("");
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setQuantity("");
    setShowError("");
  };

  const validationQuantity = (e) => {
    const value = e.target.value.trim() === "" ? "" : Number(e.target.value);
    setQuantity(value);

    if (value === "" || value >= selectedProduct.minQuantity) {
      setShowError("");
    } else {
      setShowError(`* You must order at least ${selectedProduct.minQuantity} from this product.`);
    }
  };

  const handleOrder = async () => {
    try {
      const order = {
        storeOwner: owner,
        product: selectedProduct,
        supplier: selectedProduct.supplier,
        quantity: quantity,
      };
      await dispatch(addOrder(order));
      console.log("Order placed successfully:", order);
      handleCloseDialog();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Box textAlign="center" p={3} sx={{ maxWidth: '900px', margin: 'auto', padding: 3, }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#a1e5c9' }}>
          Order Products
        </Typography>
      </motion.div>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {productsList.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Paper
              sx={{
                p: 2,
                cursor: "pointer",
                width: 150,
                textAlign: "center",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
              }}
              onClick={() => handleOpenDialog(product)}
            >
              <Typography variant="h6" sx={{ color: "#a1e5c9" }}>
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#a1e5c9" }}>
                ${product.price}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>

      <Dialog open={!!selectedProduct} onClose={handleCloseDialog}>
        {selectedProduct && (
          <>
            <DialogTitle sx={{ color: "#a1e5c9" }}>
              Order {selectedProduct.name}
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={validationQuantity}
                fullWidth
                error={!!showError}
                helperText={showError}
                sx={{
                  mt: 2,
                  "& .MuiInputLabel-root": {
                    color: "#a1e5c9",
                  },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="error">
                Cancel
              </Button>
              <Button
                onClick={handleOrder}
                variant="contained"
                sx={{ backgroundColor: "#a1e5c9" }}
                disabled={quantity === "" || quantity < selectedProduct.minQuantity}
              >
                Order
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AddOrder;
