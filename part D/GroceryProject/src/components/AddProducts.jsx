import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';

import emailjs from '@emailjs/browser';

import { getOwner } from '../slices/storeOwnerSlice';
import { addProducts } from '../slices/productSlice';

const AddProducts = () => {
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.supplier);
  const { owner } = useSelector((state) => state.storeOwner);

  const [newProducts, setNewProducts] = useState([
    { name: "", price: "", minQuantity: "", supplier: { id: currentUser.id } },
  ]);
  const [added, setAdded] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    dispatch(getOwner());
  }, [dispatch]);

  useEffect(() => {
    const hasErrors = newProducts.some((product, index) => {
      return (
        !product.name.trim() ||
        product.price === "" ||
        product.minQuantity === "" ||
        errors[`${index}-name`] ||
        errors[`${index}-price`] ||
        errors[`${index}-minQuantity`]
      );
    });
    setIsDisabled(hasErrors);
  }, [newProducts, errors]);

  const handleAddProductField = () => {
    const updatedTouched = { ...touched };

    newProducts.forEach((_, index) => {
      ["name", "price", "minQuantity"].forEach((field) => {
        updatedTouched[`${index}-${field}`] = true;
        validateField(field, index);
      });
    });

    setTouched(updatedTouched);

    const hasIncomplete = newProducts.some((product, index) => {
      return (
        !product.name.trim() ||
        product.price === "" ||
        product.minQuantity === "" ||
        errors[`${index}-name`] ||
        errors[`${index}-price`] ||
        errors[`${index}-minQuantity`]
      );
    });

    if (hasIncomplete) return;

    setNewProducts([...newProducts, { name: "", price: "", minQuantity: "", supplier: { id: currentUser.id } }]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...newProducts];

    if (field === "price" || field === "minQuantity") {
      updatedProducts[index][field] = Number(value);
    } else {
      updatedProducts[index][field] = value;
    }

    setNewProducts(updatedProducts);
    validateField(field, index);
  };


  const handleBlur = (field, index) => {
    setTouched({ ...touched, [`${index}-${field}`]: true });
    validateField(field, index);
  };

  const validateField = (field, index) => {
    let error = "";
    const value = newProducts[index][field];

    if (field === "name" && !value.trim()) error = "Product name is required";
    if (field === "price") {
      if (value === "") error = "Price is required";
      else if (value < 0) error = "Price cannot be negative";
    }
    if (field === "minQuantity") {
      if (value === "") error = "Minimum quantity is required";
      else if (value < 0) error = "Minimum quantity cannot be negative";
    }

    setErrors((prev) => ({ ...prev, [`${index}-${field}`]: error }));
  };

  const addNewProducts = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    setAdded(true);
    try {
      await dispatch(addProducts(newProducts));
      setNewProducts([{ name: "", price: "", minQuantity: "", supplier: { id: currentUser.id } }]);
      setErrors({});
      setTouched({});
      setIsDisabled(true);
      sendEmail();
    } catch (error) {
      console.error("Error adding products:", error);
    }
  };



  const sendEmail = () => {
    const emailContent = `Hello store owner!!\n\nI added new products to the system...`;
    const templateParams = {
      from_name: "New Products",
      from_email: "buildingconnect2024@gmail.com",
      to_name: "our store owner",
      to_email: owner.email,
      message: emailContent,
    };

    emailjs.send("service_ID", "template_ID", templateParams, "YB2n9plR_9_n5ymry")
      .then(response => console.log("Email sent:", response))
      .catch(error => console.error("Email sending error:", error));
  };

  return (
    <Box sx={{ maxWidth: '900px', margin: 'auto', padding: 3 }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#82c7aa' }}>
          Adding Products
        </Typography>
      </motion.div>

      {!added ? (
        <Box sx={{ bgcolor: '#f5f5f5', padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <Box component="form" sx={{ marginTop: 2 }}>
              {newProducts.map((product, index) => (
                <Box key={index} sx={{ marginBottom: 4 }}>
                  <Typography variant="subtitle1" sx={{ color: '#82c7aa', fontWeight: 'bold', marginBottom: 1 }}>
                    Product #{index + 1}
                  </Typography>
                  <TextField
                    label="Product Name"
                    value={product.name}
                    onChange={(e) => handleProductChange(index, "name", e.target.value)}
                    onBlur={() => handleBlur("name", index)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    error={!!errors[`${index}-name`] && touched[`${index}-name`]}
                    helperText={touched[`${index}-name`] && errors[`${index}-name`]}
                  />
                  <TextField
                    label="Price"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, "price", e.target.value)}
                    onBlur={() => handleBlur("price", index)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    type="number"
                    error={!!errors[`${index}-price`] && touched[`${index}-price`]}
                    helperText={touched[`${index}-price`] && errors[`${index}-price`]}
                  />
                  <TextField
                    label="Minimum Quantity"
                    value={product.minQuantity}
                    onChange={(e) => handleProductChange(index, "minQuantity", e.target.value)}
                    onBlur={() => handleBlur("minQuantity", index)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    type="number"
                    error={!!errors[`${index}-minQuantity`] && touched[`${index}-minQuantity`]}
                    helperText={touched[`${index}-minQuantity`] && errors[`${index}-minQuantity`]}
                  />
                  {index < newProducts.length - 1 && <Divider sx={{ marginTop: 2 }} />}
                </Box>
              ))}

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleAddProductField}
                  sx={{ bgcolor: '#a1e5c9', '&:hover': { backgroundColor: '#82c7aa' } }}
                >
                  Add More Products
                </Button>
                <Button
                  variant="contained"
                  onClick={addNewProducts}
                  sx={{ bgcolor: isDisabled ? '#ccc' : '#a1e5c9', '&:hover': { backgroundColor: '#82c7aa' } }}
                  disabled={isDisabled}
                >
                  Add Products
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Box>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Paper sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#82c7aa', textAlign: 'center' }}>
              Products Added Successfully!!!
            </Typography>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
            <Button
              variant="contained"
              onClick={() => setAdded(false)}
              sx={{ bgcolor: '#a1e5c9', '&:hover': { backgroundColor: '#82c7aa' } }}
            >
              Add More Products
            </Button>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default AddProducts;
