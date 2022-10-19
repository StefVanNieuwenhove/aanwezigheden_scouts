import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function TableData(tak) {

    const obj = {...tak};
    const takName = obj.tak;
    let count;

    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:9000/api/leden/${takName}`)
      .then((res) => setData(res.data));
    }, [tak]);
    
    const row = ['#', 'Firstname', 'Lastname', 'Tak', '# aanwezigheden'];

  return (
    <>
      <TableContainer component={Paper}  sx={{marginLeft: '4rem', display: 'flex', maxWidth: '95.5%'}}>
      <Table stickyHeader={true} >
        <TableHead >
          <TableRow>
            {row.map((item) => (
              <TableCell sx={{ 
                bgcolor: 'secondary.main', 
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
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      </TableContainer>
    </>
  );
}

