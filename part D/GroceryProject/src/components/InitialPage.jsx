import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  Button
} from "@mui/material";
import { motion } from "framer-motion";

import closeGrocery from '../images/closeGrocery.jpg'

const InitialPage = () => {
  
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${closeGrocery})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Box display="flex" gap={4}>
          <Paper
            elevation={10}
            sx={{
              padding: 4,
              borderRadius: 3,
              bgcolor: "rgba(255, 255, 255, 0.5)",
              width: 300,
              textAlign: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#a1e5c9" }}>
              Owner
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#a1e5c9",
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                padding: "10px 30px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                '&:hover': { bgcolor: "#88d9b3" },
              }}
              onClick={() => navigate("loginOwner")}
            >
              LOGIN
            </Button>
          </Paper>
          <Paper
            elevation={10}
            sx={{
              padding: 4,
              borderRadius: 3,
              bgcolor: "rgba(255, 255, 255, 0.5)",
              width: 300,
              textAlign: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#a1e5c9" }}>
              Supplier
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#a1e5c9",
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                padding: "10px 30px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                '&:hover': { bgcolor: "#88d9b3" },
              }}
              onClick={() => navigate("loginSupplier")}
            >
              LOGIN
            </Button>
          </Paper>
        </Box>
      </motion.div>
    </Box>
  );
};

export default InitialPage;

