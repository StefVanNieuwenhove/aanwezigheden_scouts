import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { IconButton, Slide } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let count;

export default function DeletePage() {

    const [data, setData] = useState([]);
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    useEffect(() => {
      axios.get(`http://localhost:9000/api/leden/`)
      .then((res) => setData(res.data));
    }, []);

    const onDeleteHandler = (id, newState) => {
      axios.delete(`http://localhost:9000/api/leden/${id}`)
          .then((res) => { setState({open: true, ...newState});});
      window.location.reload();
           // TODO - snackbar wordt maar kort getoond omdat deze wordt verwijderd als de pagina herhaald - hoe oplossen? - https://stackoverflow.com/questions/63424436/how-to-keep-mui-snackbar-open-when-page-is-reloaded
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setState({ ...state, open: false });
    };

    const transitionUp = (props) => {
      return <Slide {...props} direction="up" />;
    }

    const row = ['#', 'Firstname', 'Lastname', 'Tak', '# aanwezigheden', 'Delete'];

  return (
    <>
      <TableContainer component={Paper} sx={{marginLeft: '4.05rem', maxWidth: '95.5%', display: 'flex'}}>
      <Table stickyHeader={true} >
        <TableHead >
          <TableRow >
          {row.map((item) => (
              <TableCell sx={{ 
                bgcolor: 'success.light', 
                width: '5rem', 
                textAlign: 'center', 
                textDecoration: 'underline',
                borderBlock: '1px solid black',
                fontWeight: 'bold'
                }}> 
                {item} 
                </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((lid, id) => (
              count = id + 1,
              <TableRow key={lid.id}>
                <TableCell sx={{width: '5rem', textAlign: 'center', borderBottom: '1px solid black'}}>{count}</TableCell>
                <TableCell sx={{width: '10rem', textAlign: 'center', borderBottom: '1px solid black'}}>{lid.firstname}</TableCell>
                <TableCell sx={{width: '10rem', textAlign: 'center', borderBottom: '1px solid black'}}>{lid.lastname}</TableCell>
                <TableCell sx={{width: '10rem', textAlign: 'center', borderBottom: '1px solid black'}}>{lid.tak}</TableCell>
                <TableCell sx={{width: '10rem', textAlign: 'center', borderBottom: '1px solid black'}}>{lid.aanwezig}</TableCell>
                <TableCell sx={{width: '10rem', textAlign: 'center', borderBottom: '1px solid black'}}>
                  <IconButton
                   aria-label='delete' 
                   onClick={() => 
                    onDeleteHandler(lid.id, 
                    {vertical: 'bottom', horizontal: 'right'})} 
                  >
                    <DeleteForeverRoundedIcon sx={{color: 'red'}} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      </TableContainer>
      <Snackbar  // TODO - Alert gooien om de bevestiging te vragen om lid te verwijderen - Dialog? - https://mui.com/components/dialogs/
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={6000}
        resumeHideDuration={3000}
        transitionDuration={ { enter: 1000, exit: 1000, }}
        TransitionComponent={transitionUp}
      >
        <Alert onClose={handleClose} severity='success' variant='filled' sx={{width: '100%'}}>
          Lid is verwijderd!
        </Alert>
      </Snackbar>
    </>
  )
}
