import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Alert
} from '@mui/material';
import { SiteLanguageSelector } from '../../components/SiteLanguageSelector';

interface LanguagePreferences {
  siteLanguage: string;
  commentaryLanguages: {
    language: string;
    preference: 'primary' | 'secondary';
  }[];
}

export const LanguageSettings: React.FC = () => {
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState<LanguagePreferences | null>(null);
  const [primaryLanguage, setPrimaryLanguage] = useState('');
  const [secondaryLanguage, setSecondaryLanguage] = useState('');
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await fetch('/api/user/language-preferences');
      const data = await response.json();
      setPreferences(data);
      
      const primary = data.commentaryLanguages.find(l => l.preference === 'primary');
      const secondary = data.commentaryLanguages.find(l => l.preference === 'secondary');
      
      setPrimaryLanguage(primary?.language || '');
      setSecondaryLanguage(secondary?.language || '');
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/commentary-languages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primaryLanguage,
          secondaryLanguage
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Stack spacing={4}>
            <Typography variant="h5" gutterBottom>
              {t('settings.languagePreferences')}
            </Typography>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {t('settings.siteLanguage')}
              </Typography>
              <SiteLanguageSelector />
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {t('settings.commentaryLanguages')}
              </Typography>
              
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>{t('settings.primaryLanguage')}</InputLabel>
                  <Select
                    value={primaryLanguage}
                    onChange={(e) => setPrimaryLanguage(e.target.value)}
                    label={t('settings.primaryLanguage')}
                  >
                    <MenuItem value="ar">🇲🇦 العربية</MenuItem>
                    <MenuItem value="ber">🏔️ الأمازيغية</MenuItem>
                    <MenuItem value="fr">🇫🇷 Français</MenuItem>
                    <MenuItem value="en">🇬🇧 English</MenuItem>
                    <MenuItem value="es">🇪🇸 Español</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>{t('settings.secondaryLanguage')}</InputLabel>
                  <Select
                    value={secondaryLanguage}
                    onChange={(e) => setSecondaryLanguage(e.target.value)}
                    label={t('settings.secondaryLanguage')}
                  >
                    <MenuItem value="">
                      <em>{t('common.none')}</em>
                    </MenuItem>
                    <MenuItem value="ar" disabled={primaryLanguage === 'ar'}>
                      🇲🇦 العربية
                    </MenuItem>
                    <MenuItem value="ber" disabled={primaryLanguage === 'ber'}>
                      🏔️ الأمازيغية
                    </MenuItem>
                    <MenuItem value="fr" disabled={primaryLanguage === 'fr'}>
                      🇫🇷 Français
                    </MenuItem>
                    <MenuItem value="en" disabled={primaryLanguage === 'en'}>
                      🇬🇧 English
                    </MenuItem>
                    <MenuItem value="es" disabled={primaryLanguage === 'es'}>
                      🇪🇸 Español
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>

            {saveStatus && (
              <Alert severity={saveStatus}>
                {saveStatus === 'success'
                  ? t('common.savedSuccessfully')
                  : t('common.errorSaving')}
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              fullWidth
            >
              {t('common.save')}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
