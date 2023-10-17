// import PropTypes from 'prop-types';
// import ReactApexChart from 'react-apexcharts';
// // @mui
// import { useTheme, styled } from '@mui/material/styles';
// import { Card, Grid, CardHeader, FormControl, InputLabel, Input, FormHelperText, FormControlLabel, FormGroup, Button} from '@mui/material';
// // import { FormControl,InputLabel,Input,FormHelperText } from '@mui/material';
// // utils
// import { fNumber } from '../../../utils/formatNumber';
// // components
// import { useChart } from '../../../components/chart';

// // ----------------------------------------------------------------------

// const CHART_HEIGHT = 372;
// const LEGEND_HEIGHT = 72;

// const StyledChartWrapper = styled('div')(({ theme }) => ({
//   height: CHART_HEIGHT,
//   marginTop: theme.spacing(5),
//   '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
//   '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
//     overflow: 'visible',
//   },
//   '& .apexcharts-legend': {
//     height: LEGEND_HEIGHT,
//     alignContent: 'center',
//     position: 'relative !important',
//     borderTop: `solid 1px ${theme.palette.divider}`,
//     top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
//   },
// }));

// // ----------------------------------------------------------------------

// // AppFormInput.propTypes = {
// //   title: PropTypes.string,
// //   subheader: PropTypes.string,
// //   chartColors: PropTypes.arrayOf(PropTypes.string),
// //   chartData: PropTypes.array,s
// // };

// export default function AppFormInput() {
// //   const theme = useTheme();
//   function handleSubmit(event) {
//     event.preventDefault();
//     console.log( 'Email:'); 
//   }
//   return (
//     <Card>
//       <CardHeader title={"title"} subheader={"title"} />
//       <form onSubmit={handleSubmit} >
//         <FormGroup>
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <FormControl name= "input" size="lg">
//               <InputLabel htmlFor="my-input">Email address</InputLabel>
//               <Input id="my-input" aria-describedby="my-helper-text" />
//             </FormControl>
//           </Grid>
//           <Grid item xs={6}>
//             <FormControl name= "input">
//               <InputLabel htmlFor="my-input1">Tên người dùng</InputLabel>
//               <Input id="my-input1" />
//             </FormControl>
//           </Grid>
//           <Grid item xs={6}>
//             <FormControl name= "input" size="lg">
//               <InputLabel htmlFor="my-input">Tên đăng nhập</InputLabel>
//               <Input id="my-input" aria-describedby="my-helper-text" />
//             </FormControl>
//           </Grid>
//           <Grid item xs={6}>
//             <FormControl name= "input" label= "Pass">
//               <InputLabel htmlFor="my-input1">Mật khẩu</InputLabel>
//               <Input id="my-input1" />
//             </FormControl>
//           </Grid>
//           </Grid>
//         </FormGroup>
//         <Button type="submit" alight = "center"> 
//             nhập
//         </Button>
//       </form>
//     </Card>
//   );
// }
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import {Box} from '@mui/material';

export default function PaymentForm() {
  return (
    <Card>
      <CardHeader title="header" subheader="subheader" />
      <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="userFullName"
            label="Tên người dùng"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="email"
            label="Email"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="userName"
            label="Tên tài khoản"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="password"
            label="Mật khẩu"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="company"
            label="Tổ chức"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
        <Grid container justifyContent="center"  item xs={12} sx={{ alignItems: 'center' }}>
          <Button type='submit'>Huỷ</Button>
          <Button type='submit'>Tạo mới</Button>
        </Grid>
      </Grid>
      </CardContent>
    </Card>
  );
}