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
import { useGetDataSourceByIdQuery } from '../service';

// ----------------------------------------------------------------------

const initialForm = {
  name: '',
  email: '',
  description: '',
  organization:'',
}




export default function DataSourcesShowPage() {

  const navigate = useNavigate();


 



  const dataSourceId = useSelector((state) => state.data_sources.data_sourceId)

  const {data, error, isLoading, isFetching} = useGetDataSourceByIdQuery(dataSourceId)

  console.log(data)

  return (
    <>
      <Helmet>
        <title> Data Sources Detail </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Data Sources
          </Typography>
        </Stack>

        <Card>
          <CardHeader title="Chỉnh sửa thông tin nguồn dữ liệu" />
          <CardContent>
            {data ? 
                  <form >
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.name}
                      required
                      id="name"
                      label="Tên người nguồn dữ liệu"
                      fullWidth
                      autoComplete="name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.type}
                      required
                      id="type"
                      label="Phân loại"
                      fullWidth
                      autoComplete="type"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.description}
                      required
                      id="description"
                      label="Mô tả"
                      fullWidth
                      autoComplete="description"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.user.username}
                      required
                      id="user"
                      label="Người khởi tạo"
                      fullWidth
                      autoComplete="username"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.user.organization}
                      required
                      id="organization"
                      label="Tổ chức"
                      fullWidth
                      autoComplete="organization"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.category.topic}
                      required
                      id="category"
                      label="Danh mục"
                      fullWidth
                      autoComplete="category"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.createdAt}
                      required
                      id="createdAt"
                      label="Ngày khởi tạo"
                      fullWidth
                      autoComplete="createdAt"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.updatedAt}
                      required
                      id="updatedAt"
                      label="Ngày cập nhập"
                      fullWidth
                      autoComplete="updatedAt"
                      variant="standard"
                    />
                  </Grid>
                  
                  <Grid container justifyContent="center"  item xs={12} sx={{ alignItems: 'center' }}>
                    <Button sx={{marginX: '10px'}} type='button' variant="outlined" onClick={() => navigate(-1)}>Quay lại</Button>
                    <Button sx={{marginX: '10px'}} type='submit' variant="outlined">Chỉnh sửa</Button>
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
