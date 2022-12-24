import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { AUTH_TEXT } from 'app/utils/utils';

export default function Register() {
	const history = useHistory();
	const {
		register,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors, isValid },
	} = useForm({
		mode: 'all',
	});

	function handleApiErrors(errors: any) {
		if (errors) {
			console.log(errors);
			errors.forEach((error: string) => {
				if (error.includes('Password')) {
					setError('password', { message: error });
				} else if (error.includes('Email')) {
					setError('email', { message: error });
				} else if (error.includes('Username')) {
					setError('username', { message: error });
				} else if (error.includes('displayName')) {
					setError('displayName', { message: error });
				}
			});
		}
	}

	return (
		<Container
			component={Paper}
			maxWidth="sm"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				p: 4,
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				{/* Register */}
				{AUTH_TEXT.register}
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit((data) =>
					agent.AuthStore.register(data)
						.then(() => {
							toast.success(AUTH_TEXT.registerOKMsg);
							// 'Registration successful - you can now login'
							history.push('/login');
						})
						.catch((error: any) => handleApiErrors(error))
				)}
				noValidate
				sx={{ mt: 1 }}
			>
				<TextField
					margin="normal"
					fullWidth
					// label="Username"
					label={AUTH_TEXT.user}
					autoFocus
					{...register('username', {
						required: 'Username is required',
					})}
					error={!!errors.username}
					helperText={errors?.username?.message}
				/>
				<TextField
					margin="normal"
					fullWidth
					// label="Display name"
					label={AUTH_TEXT.displayUser}
					autoFocus
					{...register('displayName', {
						required: 'Display name is required',
					})}
					error={!!errors.displayName}
					helperText={errors?.displayName?.message}
				/>
				<TextField
					margin="normal"
					fullWidth
					// label="Email address"
					label={AUTH_TEXT.email}
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
							message: 'Not a valid email address',
						},
					})}
					error={!!errors.email}
					helperText={errors?.email?.message}
				/>
				<TextField
					margin="normal"
					fullWidth
					// label="Password"
					label={AUTH_TEXT.password}
					type="password"
					{...register('password', {
						required: 'Password is required',
						pattern: {
							value:
								// /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
								/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
							message: 'Password is not complex enough',
						},
					})}
					error={!!errors.password}
					helperText={errors?.password?.message}
				/>
				<LoadingButton
					disabled={!isValid}
					loading={isSubmitting}
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Register
				</LoadingButton>
				<Grid container>
					<Grid item>
						<Link to="/login">
							{/* {'Already have an account? Sign In'} */}
							{AUTH_TEXT.accountDoesExistsMsg}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
