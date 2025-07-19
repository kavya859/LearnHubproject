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
  DialogTitle,
  DialogActions,
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

const AllCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, courseId: null });

  const showMessage = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const allCoursesList = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get('api/admin/getallcourses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (data.success) {
        setAllCourses(data.data);
      } else {
        showMessage(data.message, 'warning');
      }
    } catch (error) {
      showMessage('Failed to fetch courses', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allCoursesList();
  }, []);

  const handleDeleteCourse = async () => {
    try {
      const { courseId } = confirmDialog;
      const { data } = await axiosInstance.delete(`api/user/deletecourse/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (data.success) {
        showMessage(data.message, 'success');
        allCoursesList();
      } else {
        showMessage('Failed to delete the course', 'warning');
      }
    } catch (error) {
      showMessage('Error deleting course', 'error');
      console.error(error);
    } finally {
      setConfirmDialog({ open: false, courseId: null });
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
                <StyledTableCell>Course ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Educator</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Sections</StyledTableCell>
                <StyledTableCell align="center">Enrolled</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCourses.length > 0 ? (
                allCourses.map(({ _id, C_title, C_educator, C_categories, C_price, sections, enrolled }) => (
                  <StyledTableRow key={_id}>
                    <StyledTableCell>{_id}</StyledTableCell>
                    <StyledTableCell align="center">{C_title}</StyledTableCell>
                    <StyledTableCell align="center">{C_educator}</StyledTableCell>
                    <StyledTableCell align="center">{C_categories}</StyledTableCell>
                    <StyledTableCell align="center">{C_price}</StyledTableCell>
                    <StyledTableCell align="center">{sections.length}</StyledTableCell>
                    <StyledTableCell align="center">{enrolled}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => setConfirmDialog({ open: true, courseId: _id })}
                        size="small"
                        color="error"
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={8} align="center">
                    No courses found.
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Snackbar for status messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Dialog for delete confirmation */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, courseId: null })}
      >
        <DialogTitle>Are you sure you want to delete this course?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, courseId: null })}>
            Cancel
          </Button>
          <Button onClick={handleDeleteCourse} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllCourses;

