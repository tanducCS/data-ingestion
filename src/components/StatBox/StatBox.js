// import { useState } from "react";
import { Box, Switch, Typography, useTheme } from "@mui/material";
// import { tokens } from "../theme";
// import axios from 'axios';

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  return (
    <Box width="100%" m="0 0px" p="10px" bgcolor="#E1F2F0" sx={{ borderRadius: 1}}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: 'black' }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Switch/>
          
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" >
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;