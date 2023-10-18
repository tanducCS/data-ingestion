import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';

const API_URL = 'http://hpcc.hcmut.edu.vn:13001/auth/login';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = async () => {
    try{
      const response = await axios.post(API_URL, {
        username: userName,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        // Lưu token vào local storage hoặc cookies để sử dụng cho các yêu cầu API sau này
        localStorage.setItem('token', data.token);
        // Điều hướng người dùng đến trang dashboard
        navigate('/dashboard', { replace: true });
      } else {
        // Xử lý khi đăng nhập thất bại (hiển thị thông báo lỗi, vv)  
        console.error('Login failed');
      }

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  

  return (
    <>
      <Stack spacing={3}>
        <TextField name="userName" label="username" onChange={(e) => handleUserNameChange(e)}/>

        <TextField
          onChange={(e) => handlePasswordChange(e)}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} >
        Login
      </LoadingButton>

    </>
  );
}
