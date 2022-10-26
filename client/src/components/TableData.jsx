import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// useRef,
// via hendle button naar server

const row = ['#', 'Firstname', 'Lastname', 'Tak', '# aanwezigheden', ''];

export default function TableData(tak) {
  const obj = { ...tak };
  const takName = obj.tak;
  let count;

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/leden/${takName}`)
      .then((res) => setData(res.data));
  }, [takName]);

  const [data, setData] = useState([]);
  const [aanwezig, setAanwezig] = useState(false);
  const [verwijderen, setVerwijderen] = useState(false);
  const [id, setId] = useState('');

  const openAanwezig = (e) => {
    setId(e);
    setAanwezig(true);
  };

  const closeAanwezig = () => {
    setAanwezig(false);
  };

  const openVerwijderen = (e) => {
    setId(e);
    setVerwijderen(true);
  };

  const closeVerwijderen = () => {
    setVerwijderen(false);
  };

  const isAanwezig = () => {
    console.log(id);
    axios
      .put(`http://localhost:9000/api/leden/aanwezig/${id}`)
      .then((res) => window.location.reload());
  };

  const nietAanwezig = async () => {
    await axios
      .put(`http://localhost:9000/api/leden/niet-aanwezig/${id}`)
      .then((res) => window.location.reload());
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ marginLeft: '4rem', display: 'flex', maxWidth: '95.5%' }}
      >
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              {row.map((item) => (
                <TableCell
                  key={item}
                  sx={{
                    bgcolor: 'success.light',
                    width: '5rem',
                    textAlign: 'center',
                    textDecoration: 'underline',
                    borderBlock: '1px solid black',
                    fontWeight: 'bold',
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              (lid, id) => (
                (count = id + 1),
                (
                  <TableRow key={lid.id}>
                    <TableCell
                      sx={{
                        width: '5rem',
                        textAlign: 'center',
                        borderBottom: '1px solid black',
                      }}
                    >
                      {count}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: '10rem',
                        textAlign: 'center',
                        borderBottom: '1px solid black',
                      }}
                    >
                      {lid.firstname}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: '10rem',
                        textAlign: 'center',
                        borderBottom: '1px solid black',
                      }}
                    >
                      {lid.lastname}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: '10rem',
                        textAlign: 'center',
                        borderBottom: '1px solid black',
                      }}
                    >
                      {lid.tak}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: '10rem',
                        textAlign: 'center',
                        borderBottom: '1px solid black',
                      }}
                    >
                      {lid.aanwezig}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        textAlign: 'center',
                        borderBottom: '1px solid black',
                      }}
                    >
                      <Button
                        component="button"
                        value={lid.id}
                        variant="outlined"
                        color="success"
                        //onClick={(e) => isAanwezig(e.target.value)}
                        onClick={(e) => openAanwezig(e.target.value)}
                      >
                        Aanwezig
                      </Button>
                      <Button
                        component="button"
                        value={lid.id}
                        variant="outlined"
                        color="error"
                        onClick={(e) => openVerwijderen(e.target.value)}
                      >
                        Delete aanwezig
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={aanwezig}
        onClose={closeAanwezig}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Aanwezigheid toeveogen?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Weet je zeker dat je de aanwezigheid wilt toevoegen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAanwezig} color="error" variant="outlined">
            Niet toevoegen
          </Button>
          <Button
            onClick={() => isAanwezig()}
            autoFocus
            color="success"
            variant="outlined"
          >
            Toevoegen
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={verwijderen}
        onClose={closeVerwijderen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Aanwezigheid verwijderen?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Weet je zeker dat je de aanwezigheid wilt verwijderen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeVerwijderen} color="error" variant="outlined">
            Niet verwijderen
          </Button>
          <Button
            onClick={() => nietAanwezig()}
            autoFocus
            color="success"
            variant="outlined"
          >
            verwijderen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
