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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ScreenReader from '../../components/accessibility/ScreenReader';

const Register: React.FC = () => {
  const { register } = useAuth();
  const [error, setError] = React.useState<string>('');

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      fullName: '',
      isVisuallyImpaired: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل')
        .required('اسم المستخدم مطلوب'),
      email: Yup.string()
        .email('البريد الإلكتروني غير صالح')
        .required('البريد الإلكتروني مطلوب'),
      password: Yup.string()
        .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
        .required('كلمة المرور مطلوبة'),
      fullName: Yup.string()
        .required('الاسم الكامل مطلوب'),
    }),
    onSubmit: async (values) => {
      try {
        await register(values);
      } catch (err: any) {
        setError(err.response?.data?.error || 'حدث خطأ أثناء التسجيل');
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
            إنشاء حساب جديد
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
              id="username"
              name="username"
              label="اسم المستخدم"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              inputProps={{
                'aria-label': 'اسم المستخدم',
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="fullName"
              name="fullName"
              label="الاسم الكامل"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              inputProps={{
                'aria-label': 'الاسم الكامل',
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="البريد الإلكتروني"
              autoComplete="email"
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
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              inputProps={{
                'aria-label': 'كلمة المرور',
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isVisuallyImpaired"
                  checked={formik.values.isVisuallyImpaired}
                  onChange={formik.handleChange}
                  inputProps={{
                    'aria-label': 'هل أنت من ذوي الإعاقة البصرية؟',
                  }}
                />
              }
              label="أنا من ذوي الإعاقة البصرية"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting}
            >
              تسجيل
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/login" variant="body2">
                {"لديك حساب بالفعل؟ سجل دخولك"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
