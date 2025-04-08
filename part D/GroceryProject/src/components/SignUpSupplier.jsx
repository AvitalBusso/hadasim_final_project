import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Phone, Lock, LocationCity } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { motion } from "framer-motion";

import { signUp } from "../slices/supplierSlice";
import signUpGrocery from '../images/signUpGrocery.jpg';

const SignUpSupplier = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    companyName: "",
    phone: "",
    password: "",
    representative: "",
  });

  const validateField = (name, value) => {
    const validators = {
      companyName: val => val.length < 3 && "companyName must be at least 3 characters",
      password: val => !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(val) && "Password must be at least 8 characters with lowercase, uppercase letters, and a number",
      phone: val => !/^[0-9]{3}-[0-9]{7}$/.test(val) && "Phone number must be 10 digits, formatted as xxx-xxxxxxx",
      representative: val => val.length < 2 && "representative must be at least 2 characters",
    };
    return validators[name]?.(value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const validationErrors = {};
    Object.keys(user).forEach(key => {
      const error = validateField(key, user[key]);
      if (error) {
        validationErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(validationErrors);
    if (!isValid) return;

    try {
      const response = await dispatch(signUp(user));
      if (signUp.fulfilled.match(response))
        navigate("/homePage/Supplier");
      else if (signUp.rejected.match(response)) {
        if (response.payload.status === 409) {
          setErrors({ companyName: "this name is taken" });
          setUser(prev => ({ ...prev, companyName: "" }));
        }
      }
    } catch (error) {
      console.error("Unexpected error: ", error);
    }
  };

  const updateValue = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10).replace(/(\d{3})(\d{7})/, "$1-$2") : value;
    setUser(prev => ({ ...prev, [name]: formattedValue }));
    handleBlur(e);
  };
  const fields = [
    [{ label: "Company Name", name: "companyName", icon: <LocationCity /> }, { label: "Password", name: "password", type: showPassword ? "text" : "password", icon: <Lock />, endAdornment: <IconButton onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton> }],
    [{ label: "Representative", name: "representative", icon: <Person /> }, { label: "Phone", name: "phone", icon: <Phone /> }]
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          padding: 5,
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)), url(${signUpGrocery})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <Paper
          elevation={10}
          component="form"
          onSubmit={handleSubmit}
          sx={{
            padding: 4,
            borderRadius: 3,
            bgcolor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            width: "100%",
            maxWidth: 800,
            textAlign: "center"
          }}>
          <ArrowBackIcon sx={{ cursor: "pointer", fontWeight: "bold", color: "#a1e5c9", "&:hover": { transform: "scale(1.7)", transition: "all 0.3s ease" } }} onClick={() => navigate("/loginSupplier")}
          />
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#a1e5c9" }}>Sign Up</Typography>
          {fields.map((row, index) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 3 }} key={index}>
              {row.map(({ label, name, type = "text", icon, endAdornment }) => (
                <Box key={name} sx={{ width: '100%' }}>
                  <motion.div initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}>
                    <TextField
                      label={<span style={{ color: '#a1e5c9' }}>{label}</span>}
                      name={name}
                      type={type}
                      value={user[name]}
                      onChange={updateValue}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment>, endAdornment }}
                      error={!!errors[name]}
                      helperText={errors[name]}
                      sx={{ marginBottom: 2, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#a1e5c9' } } }}
                    />
                  </motion.div>
                </Box>
              ))}
            </Box>
          ))}
          <Box mt={2}>
            <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: '#a1e5c9' }}>Sign Up</Button>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
export default SignUpSupplier;
