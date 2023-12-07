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
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';

import { useSelector } from 'react-redux';
import { useDeleteDataCategoryMutation, useGetSchemaByIdQuery, useUpdateDataCategoryMutation, useUpdateSchemaMutation} from '../service';

// ----------------------------------------------------------------------

const initialForm = {
  schemaName: '',
  type: '',
  schema: '',
}

const type = [
    {value: 'PUBLIC'},
    {value: 'PRIVATE'},
]



export default function DataSchemaShowPage() {

  const navigate = useNavigate();

  const [jsonError, setJsonError] = useState(null);

  const [formData, setFormData] = useState(initialForm)

  const [deleteDataCategory] = useDeleteDataCategoryMutation()
  
  const [updateSchema, updateSchemaResult] = useUpdateSchemaMutation();

  const dataSchemaId = useSelector((state) => state.data_schema.data_schemaId)

  const {data, error, isLoading, isFetching} = useGetSchemaByIdQuery(dataSchemaId)

  const handleChangeInput = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  const handleChangeSchema = (e) => {
    const inputSchema = e.target.value
    try{
        const jsonData = JSON.parse(inputSchema)
        setFormData({...formData, schema: jsonData})
        setJsonError(null);
    }
    catch(err){
        setJsonError('Chuỗi JSON không hợp lệ');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await updateSchema({
        body: formData,
        id: dataSchemaId,
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
      const {schemaName,type, schema} = data
      setFormData({schemaName,type, schema});
    }
  }, [data]);

  console.log(formData)

  return (
    <>
      <Helmet>
        <title> Data Schema Detail </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Data Schema
          </Typography>
        </Stack>

        <Card>
          <CardHeader title="Chỉnh sửa thông tin lược đồ" />
          <CardContent>
            {data ? 
                  <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.schemaName}
                      required
                      id="schemaName"
                      label="Tên lược đồ"
                      fullWidth
                      autoComplete="name"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={data.type}
                      select
                      id="type"
                      label="Loại truy cập"
                      fullWidth
                      autoComplete="topic"
                      variant="standard"
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                        {type.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      defaultValue={JSON.stringify(data.schema,null, 2)}
                      required
                      id="schema"
                      label="Lược đồ"
                      error={Boolean(jsonError)}
                      helperText={jsonError}
                      multiline 
                      fullWidth
                      autoComplete="schema"
                      variant="outlined"
                      minRows={4}
                      onChange={(e) => handleChangeSchema(e)}
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
