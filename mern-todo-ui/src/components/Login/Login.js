import React, { useState, useEffect } from 'react';
import {
  StyledButtonContainer,
  StyledContainer,
  StyledFormContainer,
  StyledFormHeader,
  StyledInputContainer,
} from '../Register/Register.styled';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login'
import { Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/Authentication/userSlice';

const Login = () => {
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector((state) => state.user);

  const { email, password } = loginData;

  
  const handleChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if(isError) {
      setSnackbar(true);
      setToastMessage(message);
    }
    if(isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const submitData = (e) => {
    e.preventDefault();
    const userData = {
      email, password,
    };
    dispatch(login(userData))
  };

  const handleClose = () => {
    setSnackbar(false);
  }

  const action = (
    <>
      <IconButton onClick={handleClose}>
        <CloseIcon fontSize="small"></CloseIcon>
      </IconButton>
    </>
  )

  return (
    <>
      <StyledContainer>
        <StyledFormHeader>
          <h1>
            <LoginIcon />
            Login
          </h1>
          <p>Please login to your account</p>
        </StyledFormHeader>
        <StyledFormContainer>
          <form onSubmit={submitData}>
            <StyledInputContainer>
              <input 
                type='email'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={handleChange}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <input 
                type='password'
                id='password'
                name='password'
                value={password}
                placeholder='Enter your Password'
                onChange={handleChange}
              />
            </StyledInputContainer>
            <StyledButtonContainer>
              <Button
                disabled={email === '' || password === '' }
                variant='contained'
                color='primary'
                type='submit'
              >Submit</Button>
            </StyledButtonContainer>
          </form>
        </StyledFormContainer>
      </StyledContainer>
      <Snackbar 
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={toastMessage}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        action={action}
      />
    </>
  )
};

export default Login;