import {
	Button,
	Container,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, type Dispatch, type SetStateAction, type SyntheticEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { UserType } from './model/userType';
import { rootApi } from '../../../shared/api/rootAPI';
import { useSnackbar } from 'notistack';
import type { Axios, AxiosError } from 'axios';

type AuthProps = {
	setUser: Dispatch<SetStateAction<UserType | null>>;
};

const Auth = ({ setUser }: AuthProps) => {
	// const {setUser} = props
	const [username, setUserName] = useState('');
	const [password, setPassowrd] = useState('');
	const [loading, setLoading] = useState(false);
	const [loginFormName, setLoginFormName] = useState('login');
	const [showPassword, setShowPassword] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUserName(e.currentTarget.value);
	};

	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setPassowrd(e.currentTarget.value);
	};
	const handleLogin = async () => {
		setLoading(true);
		try {
			const loginData = await rootApi.post<UserType>('/auth/login', { username: username, password: password });

			const accessToken = loginData.data.access_token;
			console.log(jwtDecode(accessToken));
			localStorage.setItem('accessToken', accessToken);
			setUser(loginData.data);
			enqueueSnackbar('Welcom back!', { variant: 'success' });
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			console.log(error);
			enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', { variant: 'error' });
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async () => {
		setLoading(true);
		try {
			const registerResponse = await fetch('https://todos-be.vercel.app/auth/register', {
				method: 'POST',
				body: JSON.stringify({ username: username, password: password }),
				mode: 'cors',
				headers: {
					'Content-type': 'application/json',
				},
			});
			if (!registerResponse.ok) {
				throw new Error('username already exists');
			}
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setLoginFormName(newAlignment);
	};
	return (
		<Container maxWidth={'sm'}>
			<ToggleButtonGroup
				disabled={loading}
				size="small"
				fullWidth
				sx={{ marginBottom: '20px' }}
				color="primary"
				value={loginFormName}
				exclusive
				onChange={handleChange}
				aria-label="Platform"
			>
				<ToggleButton value="login">Login</ToggleButton>
				<ToggleButton value="register">Register</ToggleButton>
			</ToggleButtonGroup>
			{loginFormName === 'login' ? (
				<Stack spacing={2}>
					<TextField
						disabled={loading}
						value={username}
						onChange={handleUserNameChange}
						label="email"
						variant="filled"
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							},
						}}
					/>
					<TextField
						disabled={loading}
						value={password}
						onChange={handlePasswordChange}
						type={showPassword ? 'text' : 'password'}
						label="password"
						variant="filled"
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={showPassword ? 'hide the password' : 'display the password'}
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											onMouseUp={handleMouseUpPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
					<Button onClick={handleLogin} variant="contained" loadingPosition="start" loading={loading}>
						{loading ? 'Loading' : 'Login'}
					</Button>
				</Stack>
			) : (
				<Stack spacing={2}>
					<TextField
						disabled={loading}
						value={username}
						onChange={handleUserNameChange}
						label="email"
						variant="filled"
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							},
						}}
					/>
					<TextField
						disabled={loading}
						value={password}
						onChange={handlePasswordChange}
						type={showPassword ? 'text' : 'password'}
						label="password"
						variant="filled"
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={showPassword ? 'hide the password' : 'display the password'}
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											onMouseUp={handleMouseUpPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
					<Button onClick={handleRegister} variant="contained" loadingPosition="start" loading={loading}>
						{loading ? 'Loading' : 'Register'}
					</Button>
				</Stack>
			)}
		</Container>
	);
};

export default Auth;
