import { useState } from 'react';
import {
  Box,
  FormGroup,
  MenuItem,
  TextField,
  Button,
  Container,
  FormControl,
  Grid,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';

const takken = ['kapoenen', 'wouter', 'jonggiver', 'giver', 'jin'];

export default function AddPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tak, setTak] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const resetValue = () => {
    setFirstName('');
    setLastName('');
    setTak('');
    setError(false);
    setHelperText('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstName.length < 3 || lastName.length < 3 || tak.length === 0) {
      setError(true);
      setHelperText('Please fill in all fields');
    } else {
      axios
        .post('http://localhost:9000/api/leden/', {
          firstname: firstName,
          lastname: lastName,
          tak: tak,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      resetValue();
    }
  };

  return (
    <>
      <Box sx={{ marginTop: '2rem' }}>
        <Container maxWidth="md">
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ padding: '1rem' }} fullWidth variant="outlined">
              <TextField
                color="success"
                helperText="Bv. Jan"
                label="Firstname"
                margin="normal"
                onChange={(e) => setFirstName(e.target.value)}
                required
                variant="outlined"
                value={firstName}
                autoFocus
              />
              <TextField
                color="success"
                helperText="Bv. Jansens"
                label="Lastname"
                margin="normal"
                onChange={(e) => setLastName(e.target.value)}
                required
                variant="outlined"
                value={lastName}
              />
              <TextField
                select
                color="success"
                label="Tak"
                margin="normal"
                onChange={(e) => setTak(e.target.value)}
                required
                variant="outlined"
                value={tak}
                defaultChecked="kapoenen"
              >
                {takken.map((tak) => (
                  <MenuItem key={tak} value={tak} color="success">
                    {tak}
                  </MenuItem>
                ))}
              </TextField>
              <FormHelperText error={error} sx={{ fontSize: '1rem' }}>
                {helperText}
              </FormHelperText>
              <Grid
                container
                directoin="row"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                paddingTop={2}
              >
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={resetValue}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    type="submit"
                  >
                    Voeg toe
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Container>
      </Box>
    </>
  );
}
