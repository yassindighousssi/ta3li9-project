import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';

interface Language {
  _id: string;
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (languageId: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    // Fetch languages from API
    const fetchLanguages = async () => {
      try {
        const response = await fetch('/api/languages');
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel>لغة التعليق</InputLabel>
        <Select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          label="لغة التعليق"
        >
          {languages.map((language) => (
            <MenuItem key={language._id} value={language._id}>
              <Chip
                label={`${language.nativeName} (${language.name})`}
                icon={<span>{language.flag}</span>}
                variant="outlined"
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
