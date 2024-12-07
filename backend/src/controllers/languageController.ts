import { Request, Response } from 'express';
import { Language } from '../models/Language';

export const languageController = {
  // Get all active languages
  getLanguages: async (req: Request, res: Response) => {
    try {
      const languages = await Language.find({ isActive: true });
      res.json(languages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching languages' });
    }
  },

  // Add a new language (admin only)
  addLanguage: async (req: Request, res: Response) => {
    try {
      const { code, name, nativeName, flag } = req.body;
      const language = new Language({
        code,
        name,
        nativeName,
        flag
      });
      await language.save();
      res.status(201).json(language);
    } catch (error) {
      res.status(500).json({ message: 'Error adding language' });
    }
  }
};
