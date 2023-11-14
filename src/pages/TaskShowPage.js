import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

// @mui
import {
  CircularProgress,
  Card,
  CardContent,
  TextField,
  Stack,
  Button,
  Container,
  Typography,
  CardHeader,
} from '@mui/material';
import Grid from '@mui/material/Grid';

import { useSelector } from 'react-redux';
import { useGetTaskByIdQuery } from '../service';

// ----------------------------------------------------------------------

const initialForm = {
  name: '',
  email: '',
  description: '',
  organization:'',
}




export default function TaskShowPage() {

  const navigate = useNavigate();


 



  const taskId = useSelector((state) => state.task.taskId)

  const {data, error, isLoading, isFetching} = useGetTaskByIdQuery(taskId)

  console.log(data)

  return (
    <>
      <Helmet>
        <title> Task Detail </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Task
          </Typography>
        </Stack>

        <Card>
          <CardHeader title="Thông tin tác vụ" />
          <CardContent>
            {data ? 
                  <form >
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data?.name}
                      required
                      id="name"
                      label="Tên người yêu cầu"
                      fullWidth
                      autoComplete="name"
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data?.type}
                      required
                      id="type"
                      label="Loại yêu cầu"
                      fullWidth
                      autoComplete="type"
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data?.data.organization}
                      required
                      id="organization"
                      label="Tổ Chức"
                      fullWidth
                      autoComplete="organization"
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.status}
                      required
                      id="status"
                      label="Trạng thái"
                      fullWidth
                      autoComplete="status"
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
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
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data?.description}
                      required
                      id="description"
                      label="Mô tả"
                      fullWidth
                      autoComplete="description"
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data?.note}
                      required
                      id="note"
                      label="Ghi chú"
                      fullWidth
                      autoComplete="note"
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid container justifyContent="center"  item xs={12} sx={{ alignItems: 'center' }}>
                    <Button sx={{marginX: '10px'}} type='button' variant="outlined" onClick={() => navigate(-1)}>Quay lại</Button>
                    <Button sx={{marginX: '10px'}} type='submit' variant="outlined">Đánh dấu đã xử lý</Button>
                    <Button sx={{marginX: '10px'}} type='button' variant="outlined" color="error" >Xóa</Button>
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
