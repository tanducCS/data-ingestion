
import * as React from 'react';
import { useState } from 'react';
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
import axios from 'axios';
import FileUpload from '../../../components/file-uploader/FileUpload'

const API_URL = 'http://hpcc.hcmut.edu.vn:23000/users';
export default function AppUploadFile() {
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [role,setRole] = useState('');
  const [organization,setOrganization] = useState('');
  const [email,setEmail] = useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [files, setFiles] = useState([]);
  const handleClick = async () => {
    try{
      const response = await axios.post(API_URL, {
        username: userName,
        password,
        name, 
        email,
        role,
        organization,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
      } else {
        // Xử lý khi đăng nhập thất bại (hiển thị thông báo lỗi, vv)  
        console.error('Login failed');
      }

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <Card>
      <CardHeader title="Thêm/Chỉnh sửa thông tin người dùng" />
      <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="name"
            label="Tên người dùng"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange = {(e) => handleNameChange(e)}
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
            onChange = {(e) => handleEmailChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="username"
            label="Tên tài khoản"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange = {(e) => handleUserNameChange(e)}
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
            onChange = {(e) => handlePasswordChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="role"
            label="Vai trò"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange = {(e) => handleRoleChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="organization"
            label="Tổ chức"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange = {(e) => handleOrganizationChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
        <Grid container justifyContent="left"  item xs={12} md={12} sx={{ alignItems: 'center' }}>
          {/* <input type="file" />
          <Button 
          // type="submit"
          variant="contained"
          component="label" >
            <input type="file" hidden />
            Upload
          </Button> */}
          <FileUpload/>
        </Grid>
        <Grid container justifyContent="center"  item xs={12} sx={{ alignItems: 'center' }}>
          <Button type='submit'>Huỷ</Button>
          <Button type='submit' >Tạo mới</Button>
        </Grid>
      </Grid>
      </CardContent>
    </Card>
  );
}