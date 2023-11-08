import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  CardHeader,
  CardContent,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';

// RTK Query
import { useAddUserMutation } from '../service';


const initialForm = {
    name: '',
    username: '',
    password: '',
    role: '',
    email: '',
    organization:'',
}

export default function UserNewPage() {
  const navigate = useNavigate();

  const [addUser, addUserResult] = useAddUserMutation()

  const [formData, setFormData] = useState(initialForm);
 
  const handleChangeInput = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addUser(formData)
  }

  return (
    <>
      <Helmet>
        <title> User Detail </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <CardHeader title="Thêm người dùng" />
          <CardContent>
            <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="name"
                      label="Tên người dùng"
                      fullWidth
                      autoComplete="name"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="username"
                      label="Tên tài khoản"
                      fullWidth
                      autoComplete="username"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      type='password'
                      id="password"
                      label="Mật khẩu"
                      helperText="Last three digits on signature strip"
                      fullWidth
                      autoComplete="password"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="role"
                      label="Vai trò"
                      fullWidth
                      autoComplete="role"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="organization"
                      label="Tổ chức"
                      fullWidth
                      autoComplete="organization"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid container justifyContent="center"  item xs={12} sx={{ alignItems: 'center' }}>
                    <Button type='button' onClick={() => navigate(-1)}>Quay lại</Button>
                    <Button type='submit' >Tạo mới</Button>
                  </Grid>
                </Grid>
              </form> 
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
