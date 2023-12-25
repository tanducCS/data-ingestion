
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import axios from 'axios';
import FileUpload from '../../../components/file-uploader/FileUpload';
import { useUploadDataMutation } from '../../../service';
import {secrectKey} from "../../../service/base";

const API_URL = 'http://hpcc.hcmut.edu.vn:23000/users';
const initialForm = {
  file: null
}
export default function AppUploadFile() {
  const navigate = useNavigate();

  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [srcId,setSrcId] = useState('');
  const [organization,setOrganization] = useState('');
  const [email,setEmail] = useState('');
  const [uploadData, addUserResult] = useUploadDataMutation()

  const handleSourceChange = (e) => {
    setSrcId(e.target.value);
  };

  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };

  const [formData, setFormData] = useState(new FormData());
  const [file,setFile]=useState([]);
  const handleFileChange = (uploadedFile) => {
    setFile(uploadedFile)
    // setFormData({file: {uploadedFile});
    const updatedFormData = new FormData();
    updatedFormData.append('file', uploadedFile);
    setFormData(updatedFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await localStorage.setItem('secrectKey',srcId);
      await uploadData(formData).unwrap()
      navigate('/dashboard/user/index', { replace: true });
    }
    catch(error){
      console.log(error)
    }
    // console.log(formData);
    setFormData(initialForm)
  }
  const handleClick = async () => {
    try{
      const response = await axios.post(API_URL, {
        username: userName,
        password,
        name, 
        email,
        srcId,
        organization,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
      } else {
        // Xử lý khi đăng nhập thất bại (hiển thị thông báo lỗi, vv)  
        console.error('Login failed');
      }

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <Card>
      <CardHeader title="Upload Dữ liệu" />
      <CardContent>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="role"
            label="Data Source Id"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange = {(e) => handleSourceChange(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="organization"
            label="Loại Dữ Liệu"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange = {(e) => handleOrganizationChange(e)}
          />
        </Grid>
        <Grid container justifyContent="left"  item xs={12} md={12} sx={{ alignItems: 'center' }}>
          <FileUpload onFileChange={handleFileChange}/>
        </Grid>
        <Grid container justifyContent="center"  item xs={12} sx={{ alignItems: 'center' }}>
          <Button type='submit'>Huỷ</Button>
          <Button type='submit' >Upload</Button>
        </Grid>
      </Grid>
      </form>
      </CardContent>
    </Card>
  );
}