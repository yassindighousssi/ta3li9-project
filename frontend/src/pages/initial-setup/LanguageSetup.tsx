import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Stack
} from '@mui/material';
import { SiteLanguageSelector } from '../../components/SiteLanguageSelector';

export const LanguageSetup: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFirstVisit] = useState(!localStorage.getItem('languageSelected'));

  const handleContinue = () => {
    localStorage.setItem('languageSelected', 'true');
    navigate('/login');
  };

  if (!isFirstVisit) {
    navigate('/login');
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Card>
          <CardContent>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h4" component="h1" textAlign="center">
                {t('common.welcome')}
              </Typography>
              
              <Typography variant="body1" textAlign="center">
                {t('common.selectLanguage')}
              </Typography>

              <SiteLanguageSelector />

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleContinue}
              >
                {t('common.continue')}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
