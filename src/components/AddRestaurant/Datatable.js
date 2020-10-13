import React from 'react'
import PropTypes from 'prop-types';
import {withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme) => ({
 root: {
   flexShrink: 0,
   marginLeft: theme.spacing(2.5),
 },
}));

function TablePaginationActions(props) {
 const classes = useStyles1();
 const theme = useTheme();
 const { count, page, rowsPerPage, onChangePage } = props;

 const handleFirstPageButtonClick = (event) => {
   onChangePage(event, 0);
 };

 const handleBackButtonClick = (event) => {
   onChangePage(event, page - 1);
 };

 const handleNextButtonClick = (event) => {
   onChangePage(event, page + 1);
 };

 const handleLastPageButtonClick = (event) => {
   onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
 };

 return (
   <div className={classes.root}>
     <IconButton
       onClick={handleFirstPageButtonClick}
       disabled={page === 0}
       aria-label="first page"
     >
       {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
     </IconButton>
     <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
       {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
     </IconButton>
     <IconButton
       onClick={handleNextButtonClick}
       disabled={page >= Math.ceil(count / rowsPerPage) - 1}
       aria-label="next page"
     >
       {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
     </IconButton>
     <IconButton
       onClick={handleLastPageButtonClick}
       disabled={page >= Math.ceil(count / rowsPerPage) - 1}
       aria-label="last page"
     >
       {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
     </IconButton>
   </div>
 );
}
TablePaginationActions.propTypes = {
 count: PropTypes.number.isRequired,
 onChangePage: PropTypes.func.isRequired,
 page: PropTypes.number.isRequired,
 rowsPerPage: PropTypes.number.isRequired,
};

function createData(sl, size, price, action) {
 return {sl, size, price, action };
}
const rows = [
 createData('KitKat', 518, 26.0, "Food"),
 createData('Lollipop', 392, 0.2, "Food"),
 createData('Marshmallow', 318, 0, "Food"),
 createData('Nougat', 360, 19.0, "Food"),
 createData('Oreo', 437, 18.0, "Food"),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
 table: {
   minWidth: 500,
 },
});

export default function CustomPaginationActionsTable() {
 const classes = useStyles2();
 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(5);

 const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };
 const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
 return (
  

    <TableContainer component={Paper}>

     <Table className={classes.table} aria-label="custom pagination table">
     <TableHead>
          <TableRow>
            <StyledTableCell align="right">Size</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
       <TableBody>
           {props.data.map(data => (
               <TableRow>
                   <TableCell style={{ width: 160 }} align="right">
                       {data.name}
                   </TableCell>
                   <TableCell style={{ width: 160 }} align="right">
                       {data.price}
                   </TableCell>
                   <TableCell style={{ width: 160 }} align="right">
                       <a className="button_table"><FiEdit2 /></a>
                       <a className="button_table"><RiDeleteBin2Fill /></a>
                   </TableCell>

               </TableRow>
           ))}
       </TableBody>
       <TableFooter>
         <TableRow>
           <TablePagination
             rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
             colSpan={4}
             count={rows.length}
             rowsPerPage={rowsPerPage}
             page={page}
             SelectProps={{
               inputProps: { 'aria-label': 'rows per page' },
               native: true,
             }}
             onChangePage={handleChangePage}
             onChangeRowsPerPage={handleChangeRowsPerPage}
             ActionsComponent={TablePaginationActions}
           />
         </TableRow>
       </TableFooter>
     </Table>
   </TableContainer>

 );
}

