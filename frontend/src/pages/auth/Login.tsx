import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ScreenReader from '../../components/accessibility/ScreenReader';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [error, setError] = React.useState<string>('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('البريد الإلكتروني غير صالح')
        .required('البريد الإلكتروني مطلوب'),
      password: Yup.string()
        .required('كلمة المرور مطلوبة')
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
      } catch (err: any) {
        setError(err.response?.data?.error || 'حدث خطأ أثناء تسجيل الدخول');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            تسجيل الدخول
          </Typography>

          {error && (
            <>
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
              <ScreenReader message={error} priority="assertive" />
            </>
          )}

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="البريد الإلكتروني"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              inputProps={{
                'aria-label': 'البريد الإلكتروني',
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="كلمة المرور"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              inputProps={{
                'aria-label': 'كلمة المرور',
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting}
            >
              تسجيل الدخول
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/register" variant="body2">
                {"ليس لديك حساب؟ سجل الآن"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
