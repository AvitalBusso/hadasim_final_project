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
import { motion } from "framer-motion";

import { Visibility, VisibilityOff, Lock, LocationCity } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { login } from "../slices/supplierSlice";
import loginGrocery from '../images/loginGrocery.jpg'

const LoginSupplier = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({ companyName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ companyName: "", password: "" });

  const validateCompanyName = (value) => {
    if (!value) return "User name is required.";
    if (value.length < 3) return "User name must be at least 3 characters.";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter.";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter.";
    if (!/\d/.test(value)) return "Password must contain at least one number.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyNameError = validateCompanyName(user.companyName);
    const passwordError = validatePassword(user.password);

    if (companyNameError || passwordError) {
      setErrors({ companyName: companyNameError, password: passwordError });
      return;
    }

    try {
      const response = await dispatch(login(user));
      if (login.fulfilled.match(response)) {
        navigate("/homePage/Supplier");//ניווט לעמוד הבית של הספק
      } else if (login.rejected.match(response)) {
        const error = response.payload;
        console.log("error: ",error)
        if (error.status === 400) {
          setUser({ companyName: user.companyName, password: "" });
          setErrors((prev) => ({
            ...prev, password: "Incorrect password",  // הוספת הודעת שגיאה במקרה של סיסמא לא נכונה
          }));
        }
        if (error.status === 404) {
          navigate("/signUpSupplier");//ניווט לרישום ספק
        }
      }
    } catch (error) {
      console.log("unexpected error: ", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "companyName") {
      setErrors((prev) => ({
        ...prev,
        companyName: validateCompanyName(value),
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
      }));
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)), url(${loginGrocery})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
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
              maxWidth: 500,
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <ArrowBackIcon sx={{ cursor: "pointer", fontWeight: "bold", color: "#a1e5c9", "&:hover": { transform: "scale(1.7)", transition: "all 0.3s ease" } }} onClick={() => navigate("/")}
          />
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#a1e5c9" }}
              >
                Welcome Back!
              </Typography>
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <TextField
                label={<span style={{
                  color: '#a1e5c9',
                }}>
                  Company Name
                </span>}
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#a1e5c9',
                    }
                  }
                }}
                margin="normal"
                value={user.companyName}
                onChange={(e) =>
                  setUser({ companyName: e.target.value, password: user.password })
                }
                required
                name="companyName"
                onBlur={handleBlur}
                error={!!errors.companyName}
                helperText={errors.companyName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity />
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <TextField
                label={<span style={{
                  color: '#a1e5c9',
                }}>
                  Password
                </span>}
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#a1e5c9',
                    }
                  }
                }}
                margin="normal"
                value={user.password}
                onChange={(e) =>
                  setUser({ companyName: user.companyName, password: e.target.value })
                }
                required
                name="password"
                onBlur={handleBlur}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: '#a1e5c9'
                  }}>
                  Login
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#a1e5c9',
                    borderColor: '#a1e5c9'
                  }}
                  onClick={() => navigate("/signUpSupplier")}
                >
                  Sign Up
                </Button>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>
      </Box>
    </>

  )
}
export default LoginSupplier;
