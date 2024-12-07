import { Request, Response } from 'express';
import { User } from '../models/User';

export const languagePreferencesController = {
  // تحديث لغة الموقع
  updateSiteLanguage: async (req: Request, res: Response) => {
    try {
      const { userId } = req.user;
      const { language } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.languagePreferences.siteLanguage = language;
      await user.save();

      res.json({ message: 'Site language updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating site language' });
    }
  },

  // تحديث لغات التعليق المفضلة
  updateCommentaryLanguages: async (req: Request, res: Response) => {
    try {
      const { userId } = req.user;
      const { primaryLanguage, secondaryLanguage } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.languagePreferences.commentaryLanguages = [
        { language: primaryLanguage, preference: 'primary' },
        { language: secondaryLanguage, preference: 'secondary' }
      ].filter(lang => lang.language); // فقط اللغات المحددة

      await user.save();

      res.json({ message: 'Commentary languages updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating commentary languages' });
    }
  },

  // الحصول على تفضيلات اللغة
  getLanguagePreferences: async (req: Request, res: Response) => {
    try {
      const { userId } = req.user;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user.languagePreferences);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching language preferences' });
    }
  }
};
