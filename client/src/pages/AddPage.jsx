import { useState } from 'react';
import { Backdrop, Box, FilledInput, FormControl, FormGroup, FormLabel, MenuItem, TextField, CircularProgress, Button, InputLabel, FormHelperText } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const takken = ['kapoenen', 'wouter', 'jonggiver', 'giver', 'jin'];

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  tak: yup.string().required(),
}).required();

const SelectTak = ({id, label, color, placeholder, variant, margin, required, fullWidth, size}) => {
  <TextField
    id={id}
    label={label}
    color={color}
    placeholder={placeholder}
    variant={variant}
    margin={margin}
    required={required}
    fullWidth={fullWidth}
    size={size}
  >
    {takken.map((tak) => (
      <MenuItem key={tak} value={tak}>
        {tak}
      </MenuItem>
    ))}
  </TextField>
}

export default function AddPage() {

  const [tak, setTak] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  // return (
  //   <>
  //     <Box component='div' sx={{
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       marginTop: '2rem',
  //       border: '1px solid #ccc',
  //       maxWidth: '60%',
  //       textAlign: 'center',
  //       padding: '1rem'
  //     }}>
  //       <FormGroup>
  //         <FormControl>
  //           <TextField 
  //             id='firstname' 
  //             label='Firstname' 
  //             variant='outlined' 
  //             size='normal'
  //             color='success'
  //             fullWidth={true}
  //             focused={true}
  //             placeholder='Jans'
  //             margin='normal'
  //             required={true}
  //           />
  //           <TextField 
  //             id='lastname' 
  //             label='Lastname' 
  //             variant='outlined' 
  //             size='normal'
  //             color='success'
  //             fullWidth={true}
  //             placeholder='Janssens'
  //             margin='normal'
  //             required={true}
  //           />
  //           <TextField
  //             id='tak' 
  //             label='Tak'
  //             value={tak}
  //             select
  //             helperText='Selecteer een tak'
  //             color='success'
  //             margin='normal'
  //             required={true}
  //           >
  //             {takken.map((tak) => (
  //               <MenuItem key={tak} value={tak}>
  //                 {tak}
  //               </MenuItem>
  //             ))}
  //           </TextField>
  //           <Button 
  //             variant='outlined'
  //             onClick={handleToggle}
  //             color='success'
  //             margin='normal'
  //           >
  //             Submit
  //           </Button>
  //           <Backdrop
  //             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //             open={open}
  //             onClick={handleClose}
  //             transitionDuration={500}
  //           >
  //             <CircularProgress color="inherit" />
  //           </Backdrop>
  //         </FormControl>
  //       </FormGroup>
  //     </Box>
  //   </>
  // )

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  }

  return (
    <>
      <div className='container-fluid ms-5'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3 ms-5'>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Firstname</label>
          <input
            {...register('user', {
              required: 'user is required',
              minLength: { value: 2, message: 'Min length is 2' }
            })}
            defaultValue=''
            id="user"
            type="text"
            className="form-control"
            placeholder="Jan"
            required
          />
          {errors.user && <p className="form-text text-danger">{errors.user.message}</p> }
        </div>
      </form>
      </div>
    </>
  );
}
