import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';

// material
import {
  Box,
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Autocomplete,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// component
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Iconify from '../../../components/Iconify';
import statesJSON from './states.json';
import districtsJSON from './districts.json';
// reducers
import { AddLocation } from '../../../redux/Pole/PoleReducer';
// import data from './statesAndDistricts';

// ----------------------------------------------------------------------

export default function AddNewLocationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(data);

  const AddNewLocationSchema = Yup.object().shape({
    locationName: Yup.string().required('General Name is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    pincode: Yup.string().required('Pincode is required'),
  });

  const formik = useFormik({
    initialValues: {
      locationName: '',
      state: '',
      district: '',
      pincode: '',
      remember: true,
    },
    validationSchema: AddNewLocationSchema,
    onSubmit: (values, actions) => {
      // console.log(values,actions)
      // dispatch(
      //   AddLocation({
      //     payload: values,
      //     callback: (msg, data, recall) => {
      //       console.log(data);
      //       if (msg === 'error' || data.error) {
      //         setSubmitting(false);
      //         toast.error(data.error || 'Something went wrong', {
      //           position: 'top-right',
      //           autoClose: 5000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //         });
      //       } else if (data && data.data && data.data.twofactorEnabled) {
      //         toast.success('OTP has been sent to your email', {
      //           position: 'top-right',
      //           autoClose: 5000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //         });
      //         navigate('/twofactorotp', { replace: false, state: { email: values.email, password: values.password } });
      //       }
      //       recall();
      //     },
      //   })
      // );
    },
  });

  const [state, setState] = useState('');
  const [input, setInput] = useState('');
  const [input1, setInput1] = useState('');

  const [jsonResults, setJsonResults] = useState([]);
  const [jsonResults1, setJsonResults1] = useState([]);

  useEffect(() => {
    setJsonResults(
      statesJSON.filter((x) => x.country_code === 'IN' && x.name.toLowerCase().includes(input.toLowerCase()))
    );
  }, [input]);

  useEffect(() => {
    setJsonResults1(
      districtsJSON.filter((x) => x.country_code === 'IN' && x.name.toLowerCase().includes(input1.toLowerCase()))
    );
  }, [input1]);

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoFocus
              margin="dense"
              id="location-name"
              label="General Name"
              type="text"
              variant="standard"
              {...getFieldProps('locationName')}
              error={Boolean(touched.locationName && errors.locationName)}
              helperText={touched.locationName && errors.locationName}
            />
            <Autocomplete
              disablePortal
              // value={input}
              options={jsonResults}
              onChange={(e, n) => setState(n)}
              id="states-autocomplete"
              getOptionLabel={(jsonResults) => `${jsonResults.name}`}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              noOptionsText={'No options'}
              onInputChange={(event, newInputValue) => {
                setInput(newInputValue);
              }}
              renderOption={(props, jsonResults) => (
                <Box component="li" {...props} key={jsonResults.id}>
                  {jsonResults.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  margin="dense"
                  id="states"
                  label="State"
                  type="text"
                  variant="standard"
                  {...getFieldProps('state')}
                  error={Boolean(touched.state && errors.state)}
                  helperText={touched.state && errors.state}
                />
              )}
            />
            <Autocomplete
              disablePortal
              // value={input}
              options={jsonResults1}
              onChange={(e, n) => setState(n)}
              id="districts-autocomplete"
              getOptionLabel={(jsonResults1) => `${jsonResults1.name}`}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              noOptionsText={'No options'}
              onInputChange={(event, newInputValue) => {
                setInput1(newInputValue);
              }}
              renderOption={(props, jsonResults1) => (
                <Box component="li" {...props} key={jsonResults1.id}>
                  {jsonResults1.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  margin="dense"
                  id="districts"
                  label="District"
                  type="text"
                  variant="standard"
                  {...getFieldProps('district')}
                  error={Boolean(touched.district && errors.district)}
                  helperText={touched.district && errors.district}
                />
              )}
            />

            <TextField
              fullWidth
              margin="dense"
              id="pincode"
              label="Pin Code"
              type="text"
              variant="standard"
              {...getFieldProps('pincode')}
              error={Boolean(touched.pincode && errors.pincode)}
              helperText={touched.pincode && errors.pincode}
            />
          </Stack>
          <Stack spacing={3}>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Register Location
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
