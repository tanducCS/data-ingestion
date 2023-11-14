import { useState,useEffect } from 'react';
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
import { useDeleteDataCategoryMutation, useGetDataCategoryByIdQuery, useUpdateDataCategoryMutation} from '../service';

// ----------------------------------------------------------------------

const initialForm = {
  name: '',
  topic: '',
  description: '',
}




export default function DataCategoriesShowPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm)

  const [deleteDataCategory] = useDeleteDataCategoryMutation()
  
  const [updateDataCategory, updateDataCategoryResult] = useUpdateDataCategoryMutation();

  const dataCategoryId = useSelector((state) => state.data_categories.data_categoryId)

  const {data, error, isLoading, isFetching} = useGetDataCategoryByIdQuery(dataCategoryId)

  const handleChangeInput = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await updateDataCategory({
        body: formData,
        id: dataCategoryId,
      }).unwrap()
    }
    catch (error){
      console.log(error)
    }
    setFormData(initialForm)
  }

  const handleDelete = async (id) => {
    await deleteDataCategory(id)
  }

  useEffect(() => {
    if (data) {
      const {name,topic, description} = data
      setFormData({name,topic, description});
    }
  }, [data]);

  console.log(formData)
  return (
    <>
      <Helmet>
        <title> Data Category Detail </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Data Category
          </Typography>
        </Stack>

        <Card>
          <CardHeader title="Chỉnh sửa thông tin danh mục dữ liệu" />
          <CardContent>
            {data ? 
                  <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.name}
                      required
                      id="name"
                      label="Tên danh mục"
                      fullWidth
                      autoComplete="name"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.topic}
                      required
                      id="topic"
                      label="Chủ đề"
                      fullWidth
                      autoComplete="topic"
                      variant="standard"
                      onChange={handleChangeInput}
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
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.description}
                      required
                      id="description"
                      label="Mô tả"
                      multiline 
                      fullWidth
                      autoComplete="description"
                      variant="outlined"
                      minRows={4}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid container justifyContent="center"  item xs={12} sx={{ alignItems: 'center' }}>
                    <Button sx={{marginX: '10px'}} type='button' variant="outlined" onClick={() => navigate(-1)}>Quay lại</Button>
                    <Button sx={{marginX: '10px'}} type='submit' variant="outlined">Chỉnh sửa</Button>
                    <Button sx={{marginX: '10px'}} type='button' variant="outlined" color="error" onClick={() => handleDelete(dataCategoryId)}>Xóa</Button>
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
