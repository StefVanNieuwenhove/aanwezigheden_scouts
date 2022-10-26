import { useState } from 'react';
import { Box, FormGroup, MenuItem, TextField, Button, } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

const takken = ['kapoenen', 'wouter', 'jonggiver', 'giver', 'jin'];

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  tak: yup.string().required(),
}).required();

export default function AddPage() {

  return (
    <>
      
    </>
  );
}
