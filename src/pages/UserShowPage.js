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
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDeleteUserMutation, useGetUsersByIdQuery, useUpdateUserMutation } from '../service';

const initialForm = {
  name: '',
  role: '',
  email: '',
  organization:'',
}

const role = [
  {value: 'DATA_OWNER'},
  {value: 'ADMIN'},
  {value: 'GUEST'},
]


export default function UserShowPage() {
  const navigate = useNavigate();

  const [deleteUser] = useDeleteUserMutation()

  const userId = useSelector((state) => state.user.userId)

  const {data, error, isLoading, isFetching} = useGetUsersByIdQuery(userId)

  const [updateUser, updateUserResult] = useUpdateUserMutation()

  const [formData, setFormData] = useState(initialForm);
 
  const handleChangeInput = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await updateUser({
        body: formData,
        id: userId,
      }).unwrap()
    }
    catch (error){
      console.log(error)
    }
    
    setFormData(initialForm)
  }

  const handleDeleteUser = async (id) => {
    await deleteUser(id)
    navigate('/dashboard/user/index', { replace: true });
  }

  useEffect(() => {
    if (data) {
      const {name,role,email,organization} = data
      setFormData({name,role,email,organization});
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
                  <form onSubmit={handleSubmit}>
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
                      defaultValue={data?.role}
                      select
                      id="role"
                      label="Vai trò"
                      fullWidth
                      autoComplete="role"
                      variant="standard"
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      {role.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    <Button sx={{marginX: '10px'}} type='button' variant="outlined" onClick={() => navigate(-1)}>Quay lại</Button>
                    <Button sx={{marginX: '10px'}} type='submit' variant="outlined">Chỉnh sửa</Button>
                    <Button sx={{marginX: '10px'}} type='button' variant="outlined" color="error" onClick={() => handleDeleteUser(userId)}>Xóa</Button>
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
