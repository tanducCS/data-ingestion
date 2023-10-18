import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  Link,
  IconButton,
  TableContainer,
  TablePagination,
  CardHeader,
  useTheme,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên', alignRight: false },
  { id: 'type', label: 'Loại yêu cầu', alignRight: false },
  { id: 'time', label: 'Ngày khởi tạo', alignRight: false },
  { id: 'role', label: 'Vai trò', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserShowPage() {
  const theme = useTheme();

  const [openTask, setOpenTask] = useState(false);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteTask = () => {
    setOpenTask(true);
  };
  const handleCloseDeleteTask = () => {
    setOpenTask(false);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

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

        <Card sx={{
          padding: '2em'
        }}
        >
            <Grid container spacing={1} justifyContent="space-around"  sx={{ marginBottom: '100px' }}>
              <Grid container item xs>
                <Typography variant="h4" >
                  Thông tin Người dùng  
                </Typography>
              </Grid>
              <Grid container item xs justifyContent="space-between" >
                <Grid item  >
                  <Button variant="outlined" color="success">QUAY LẠI</Button>
                </Grid>
                <Grid >
                  <Button variant="contained" item  color="success" sx={{color: 'white'}}>CẬP NHẬP</Button>
                </Grid>
                <Grid item >
                  <Button  variant="contained" color="error" onClick={handleDeleteTask}>XÓA</Button>

                  {/* Dialog to alert when to delete */}
                  <Dialog
                    fullWidth='true'
                    maxWidth='sm'
                    open={openTask}
                    onClose={handleCloseDeleteTask}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Xác nhận"}
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleCloseDeleteTask}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon/>
                    </IconButton>
                    <Divider />
                    <DialogContent >
                      <DialogContentText id="alert-dialog-description">
                        Bạn muốn người dùng này?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button variant='outlined' onClick={handleCloseDeleteTask} color='success'>HỦY</Button>
                      <Button variant='contained' onClick={handleCloseDeleteTask} autoFocus color="error">
                        XÓA
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={6}>
              <Grid container item xs={6}>
                <Grid item xs={4}>
                  <Typography variant="h6" >
                    Tên người dùng:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h8" xs={{innerHeight: '100%'}} >
                    John Due
                  </Typography>
                </Grid>
              </Grid>

              <Grid container item xs={6}>
                <Grid item xs={4}>
                  <Typography variant="h6" >
                    Tên đăng nhập
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h8" xs={{innerHeight: '100%'}} >
                    johndue
                  </Typography>
                </Grid>
              </Grid>
              
              <Grid container item xs={6}>
                <Grid item xs={4}>
                  <Typography variant="h6" >
                    Tổ chức:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h8" xs={{innerHeight: '100%'}} >
                    HPC Lab
                  </Typography>
                </Grid>
              </Grid>

              <Grid container item xs={6}>
                <Grid item xs={4}>
                  <Typography variant="h6" >
                    Vai trò:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h8" xs={{innerHeight: '100%'}} >
                    Khách
                  </Typography>
                </Grid>
              </Grid>

              <Grid container item xs={6}>
                <Grid item xs={4}>
                  <Typography variant="h6" >
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h8" xs={{innerHeight: '100%'}} >
                    hotanduc@gmail.com
                  </Typography>
                </Grid>
              </Grid>

              


              <Grid container item xs={6}>
                <Grid item xs={4}>
                  <Typography variant="h6" >
                    Ngày khởi tạo:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h8" xs={{innerHeight: '100%'}} >
                    ....
                  </Typography>
                </Grid>
              </Grid>

              <Grid container item xs={6}>
                <Grid item xs={4}>
                  <Typography variant="h6" >
                    Ngày cập nhập:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h8" xs={{innerHeight: '100%'}} >
                    ....
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
        </Card>
      </Container>

      



      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
