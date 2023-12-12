import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox,FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components

import { useAuthLoginMutation } from '../../../service';
import Iconify from '../../../components/iconify';


const initialForm = {
  username: '',
  password: '',
}
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [authLogin, authLoginResult] = useAuthLoginMutation()

  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState(initialForm);

  const handleChangeInput = (e) => {
    const {name,value} = e.target
    setFormData({...formData,[name]: value})
  
  }
  const handleClick = async () => {
    try{
      const response = await authLogin(formData).unwrap()
      
      if (response) {
        // Lưu token vào local storage hoặc cookies để sử dụng cho các yêu cầu API sau này
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
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
        <TextField name="username" label="username" onChange={handleChangeInput}/>

        <TextField
          onChange={handleChangeInput}
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
        <FormControlLabel control={<Checkbox name="remember" label="Remember me" />} label="Remember me" />
        
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
