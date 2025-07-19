import React, { useState, useEffect } from 'react';
import {
  Button,
  styled,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import axiosInstance from '../common/AxiosInstance';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AdminHome = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, userId: null });

  const showMessage = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get('api/admin/getallusers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (data.success) {
        setAllUsers(data.data);
      } else {
        showMessage(data.message, 'warning');
      }
    } catch (error) {
      showMessage("Failed to fetch users", 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const { userId } = confirmDialog;
      const { data } = await axiosInstance.delete(`api/user/deleteuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (data.success) {
        showMessage(data.message, 'success');
        fetchAllUsers();
      } else {
        showMessage("Failed to delete the user", 'warning');
      }
    } catch (error) {
      showMessage("Error deleting user", 'error');
      console.error(error);
    } finally {
      setConfirmDialog({ open: false, userId: null });
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell align="left">User Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Type</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.length > 0 ? (
                allUsers.map(({ _id, name, email, type }) => (
                  <StyledTableRow key={_id}>
                    <StyledTableCell>{_id}</StyledTableCell>
                    <StyledTableCell>{name}</StyledTableCell>
                    <StyledTableCell>{email}</StyledTableCell>
                    <StyledTableCell>{type}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => setConfirmDialog({ open: true, userId: _id })}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
                    No users found.
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Delete confirmation dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, userId: null })}
      >
        <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, userId: null })}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminHome;

