import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  useTheme
} from '@mui/material';

const languages = [
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  { code: 'ber', name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: '🏔️' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export const SiteLanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('userLanguage', langCode);
    document.dir = langCode === 'ar' || langCode === 'ber' ? 'rtl' : 'ltr';
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <Select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          sx={{
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }
          }}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              value={lang.code}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <span>{lang.flag}</span>
              <Typography>{lang.name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
