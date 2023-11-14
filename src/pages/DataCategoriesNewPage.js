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
import { useAddDataCategoryMutation, useAddUserMutation } from '../service';


const initialForm = {
    name: '',
    topic: '',
    description: '',    
}

export default function DataCategoriesNewPage() {
  const navigate = useNavigate();

  const [addDataCategory, addDataCategoryResult] = useAddDataCategoryMutation()

  const [formData, setFormData] = useState(initialForm);
 
  const handleChangeInput = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await addDataCategory(formData).unwrap()
    }
    catch(error){
      console.log(error)
    }
    setFormData(initialForm)
  }
  console.log(formData)
  return (
    <>
      <Helmet>
        <title> Data Category </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Data Category
          </Typography>
        </Stack>

        <Card>
          <CardHeader title="Thêm danh mục dữ liệu" />
          <CardContent>
            <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
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
                      required
                      id="topic"
                      label="Chủ đề"
                      fullWidth
                      autoComplete="topic"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      required
                      id="description"
                      label="Mô tả"
                      fullWidth
                      multiline
                      minRows={4}
                      autoComplete="description"
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
