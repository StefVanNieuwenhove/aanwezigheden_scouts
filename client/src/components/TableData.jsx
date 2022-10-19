import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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
    

  return (
    <TableContainer component={Paper} sx={{marginLeft: '4.05rem'}}>
      <Table stickyHeader={true} >
        <TableHead >
          <TableRow >
            <TableCell sx={{ bgcolor: 'success.light', fontStyle: 'bold'}}>#</TableCell>
            <TableCell sx={{ bgcolor: 'success.light', fontStyle: 'bold'}}>Firstname</TableCell>
            <TableCell sx={{ bgcolor: 'success.light', fontStyle: 'bold'}}>Lastname</TableCell>
            <TableCell sx={{ bgcolor: 'success.light', fontStyle: 'bold'}}>Tak</TableCell>
            <TableCell sx={{ bgcolor: 'success.light', fontStyle: 'bold'}}># aanwezigheden</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((lid, id) => (
              count = id + 1,
              <TableRow key={lid.id}>
                <TableCell>{count}</TableCell>
                <TableCell>{lid.firstname}</TableCell>
                <TableCell>{lid.lastname}</TableCell>
                <TableCell>{lid.tak}</TableCell>
                <TableCell>{lid.aanwezig}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

