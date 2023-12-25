import { Helmet } from 'react-helmet-async';
import { useState,useEffect } from 'react';
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
  MenuItem,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';

// RTK Query
import { useAddDataSourceMutation,useGetAllDataCategoriesQuery, useGetAllSchemaQuery } from '../service';

const dataSourceType = [
  {value: 'DATABASE'},
  {value: 'REST_API'},
  {value: 'FILE'},
  {value: 'DEVICE'},
]

const queryType = [
  {value: 'STATIC'},
  {value: 'ACTIVE'},
  {value: 'PASSIVE'},
]


const initialForm = {
  name: "",
  category: "",
  icon: "",
  schema: "",
  queryType: "STATIC",
  type: "REST_API",
  description: "",
  metadata: ""
}



export default function DataSourceNewPage() {
  const navigate = useNavigate();

  const [addDataSource, addDataSourceResult] = useAddDataSourceMutation() 

  const { data: dataCategories, error, isLoading, isFetching } = useGetAllDataCategoriesQuery()
  

  const {data: dataSchema} = useGetAllSchemaQuery()
  


  const [formData, setFormData] = useState(initialForm);
  const [jsonError, setJsonError] = useState(null);

  const handleChangeMetadata = (e) => {
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
 
  const handleChangeInput = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  // const handleChangeSchema = (e) => {
  //   const selectedSchemaId = e.target.value;
  //   if (selectedSchemaId === null) {
  //     // Nếu chọn null, xóa trường schema trong formData
  //     const { schema, ...formDataWithoutSchema } = formData;
  //     setFormData(formDataWithoutSchema);
  //   } else {
  //     // Ngược lại, tạo trường schema và gán bằng schemaName
  //     const selectedSchema = optionSchema.find((schema) => schema.id === selectedSchemaId);
  //     setFormData({ ...formData, schema: selectedSchema.schemaName });
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await addDataSource(formData)
      navigate('/dashboard/data_sources/index', { replace: true });
    }
    catch(error){
      console.log(error)
    }
    setFormData(initialForm)
  }
  console.log(formData)


  useEffect(() => {
    if (dataCategories && !formData.category) {
      setFormData({
        ...formData,
        category: dataCategories[0].id,
      });
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> New Data Source </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Data Source
          </Typography>
        </Stack>

        <Card>
          <CardHeader title="Thêm Nguồn dữ liệu" />
          <CardContent>
            <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="name"
                      label="Tên nguồn dữ liệu"
                      fullWidth
                      autoComplete="name"
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={dataCategories ?  dataCategories[0].id : null}
                      required
                      select
                      id="category"
                      label="Danh mục dữ liệu"
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {dataCategories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="icon"
                      label="Icon"
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={"STATIC"}
                      required
                      select
                      id="queryType"
                      label="Kiểu truy vấn"
                      fullWidth
                      autoComplete="password"
                      variant="standard"
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      {queryType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue={"REST_API"}
                      required
                      select
                      id="type"
                      label="Kiểu nguồn dữ liệu"
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      {dataSourceType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>  
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      defaultValue= "null"
                      select
                      id="schema"
                      label="Lược đồ dữ liệu"
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => setFormData({...formData, schema: e.target.value})}
                    >
                      {dataSchema?.map((schema) => (
                        <MenuItem key={schema.id} value={schema.schemaName}>
                          {schema.schemaName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="description"
                      label="Mô tả"
                      multiline
                      minRows={4}
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="metadata"
                      label="Metadata nguồn dữ liệu"
                      multiline
                      error={Boolean(jsonError)}
                      helperText={jsonError}
                      minRows={4}
                      fullWidth
                      autoComplete=""
                      variant="standard"
                      onChange={(e) => handleChangeMetadata(e)}
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
