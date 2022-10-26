import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
} from '@mui/material';

const row = ['#', 'Firstname', 'Lastname', 'Tak', '# aanwezigheden'];

export default function Home() {
  let count = 0;

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/leden/')
      .then((res) => setData(res.data));
  }, []);

  const [data, setData] = useState([]);
  return (
    <>
      <Container maxWidth="xl">
        <TableContainer component={Paper} sx={{ marginLeft: '1.5rem' }}>
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
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
