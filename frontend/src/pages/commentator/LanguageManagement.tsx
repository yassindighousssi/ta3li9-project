import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { LanguageSelector } from '../../components/LanguageSelector';

interface CommentatorLanguage {
  language: {
    _id: string;
    name: string;
    nativeName: string;
    flag: string;
  };
  proficiencyLevel: string;
  isVerified: boolean;
}

export const LanguageManagement: React.FC = () => {
  const [commentatorLanguages, setCommentatorLanguages] = useState<CommentatorLanguage[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState('BASIC');

  const handleAddLanguage = async () => {
    try {
      const response = await fetch('/api/commentator/languages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          languageId: selectedLanguage,
          proficiencyLevel,
        }),
      });

      if (response.ok) {
        // Refresh languages list
        fetchCommentatorLanguages();
        setOpenDialog(false);
      }
    } catch (error) {
      console.error('Error adding language:', error);
    }
  };

  const fetchCommentatorLanguages = async () => {
    try {
      const response = await fetch('/api/commentator/languages');
      const data = await response.json();
      setCommentatorLanguages(data);
    } catch (error) {
      console.error('Error fetching commentator languages:', error);
    }
  };

  useEffect(() => {
    fetchCommentatorLanguages();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        إدارة لغات التعليق
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
      >
        إضافة لغة جديدة
      </Button>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {commentatorLanguages.map((lang) => (
          <Card key={lang.language._id}>
            <CardContent>
              <Typography variant="h6">
                {lang.language.flag} {lang.language.nativeName}
              </Typography>
              <Typography color="textSecondary">
                مستوى الإتقان: {lang.proficiencyLevel}
              </Typography>
              <Typography color="textSecondary">
                الحالة: {lang.isVerified ? 'موثق ✓' : 'قيد المراجعة'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>إضافة لغة جديدة</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>مستوى الإتقان</InputLabel>
              <Select
                value={proficiencyLevel}
                onChange={(e) => setProficiencyLevel(e.target.value)}
                label="مستوى الإتقان"
              >
                <MenuItem value="BASIC">مبتدئ</MenuItem>
                <MenuItem value="INTERMEDIATE">متوسط</MenuItem>
                <MenuItem value="ADVANCED">متقدم</MenuItem>
                <MenuItem value="NATIVE">لغة أم</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button onClick={handleAddLanguage} variant="contained">
            إضافة
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
