import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
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
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';

// RTK Query
import { useAddSchemaMutation } from '../service';


const initialForm = {
    schemaName: '',
    type: 'PUBLIC',
    schema: '',    
}

const type = [
    {value: 'PUBLIC'},
    {value: 'PRIVATE'},
]

export default function DataSchemaNewPage() {
  const navigate = useNavigate();

  const [addSchema, addSchemaResult] = useAddSchemaMutation();

  const [jsonError,setJsonError] = useState(null)

  const [formData, setFormData] = useState(initialForm);
 
  const handleChangeInput = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  const handleChangeSchema = (e) => {
    const inputSchema = e.target.value
    try{
        const jsonData = JSON.parse(inputSchema);
        setFormData({...formData, schema: jsonData} )
        setJsonError(null)
    }
    catch(err){
        setJsonError('Chuỗi JSON không hợp lệ')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await addSchema(formData).unwrap()
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
        <title> Data Schema </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Data Schema
          </Typography>
        </Stack>

        <Card>
          <CardHeader title="Thêm lược đồ dữ liệu" />
          <CardContent>
            <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
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
                      defaultValue='PUBLIC'
                      required
                      select
                      id="type"
                      label="Loại truy cập"
                      fullWidth
                      autoComplete="type"
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
                      required
                      id="schema"
                      label="Lược đồ"
                      fullWidth
                      multiline
                      minRows={4}
                      autoComplete="description"
                      variant="standard"
                      onChange={(e) => handleChangeSchema(e)}
                      error= {Boolean(jsonError)}
                      helperText={jsonError}
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
