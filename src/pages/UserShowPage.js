import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  CircularProgress,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
// components


import { useGetUsersByIdQuery } from '../service';

export default function UserShowPage() {
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.userId)

  const {data, error, isLoading, isFetching} = useGetUsersByIdQuery(userId)

  const [formData, setFormData] = useState({});
 
  const handleChangeInput = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

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
          <CardHeader title="Chỉnh sửa thông tin người dùng" />
          <CardContent>
            {data ? 
                  <form>
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data?.name}
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
                      defaultValue={data?.email}
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
                      defaultValue={data?.username}
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
                      id="password"
                      label="Mật khẩu"
                      helperText="Last three digits on signature strip"
                      fullWidth
                      autoComplete="password"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data?.role}
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
                      defaultValue={data?.organization}
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
              :
              <CircularProgress />
            }
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
