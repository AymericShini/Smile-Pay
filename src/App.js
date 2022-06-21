import './App.css';
import logo from './assets/images/SP-Bleu-Jaune.png'
import data from './exemple_transactions.json'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import React, { useState } from 'react';
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function App() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  fetch(data)
  .then(response => {
    return response.json();
  })
  .then(d => {
    this.setState({ clouds: d });
    console.log("state", this.state.clouds)
  })
  .catch(error => console.log(error))

  const classes = useStyles();
  const zz = data.transactions.map(bill => bill.amount).reduce((acc, amount) => acc + amount);
  const result = Object.values(data.transactions).reduce((r, { amount }) => r + amount, 0);
  console.log("zzz",result);
  console.log("aaa",zz);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Datetime</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Mode</TableCell>
              <TableCell align="right">Commentaire</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => (
              <TableRow key={value.id}>
                <TableCell>{value.id}</TableCell>
                <TableCell align="right">{value.datetime}</TableCell>
                <TableCell align="right">{value.amount}</TableCell>
                <TableCell align="right">{value.type}</TableCell>
                <TableCell align="right">{value.mode}</TableCell>
                <TableCell align="right">{value.commentaire}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      </div>
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total Debit</TableCell>
                <TableCell>Total Credit</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.transactions.map((value, index) => (
              <TableRow key={value.id}>
                <TableCell >{value.amount}</TableCell>
                <TableCell >{value.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
