import { LastScrapedModel } from '../models/LastScraped';

/**
 * Checks text. If text is already scraped returns true, else returns false
 * @param text - Text which need to be checked
 */

const scraped = async (text): Promise <boolean> => {
  // Remove obsolete entries
  await LastScrapedModel.deleteMany({
    dateToDelete: { $lt: Date.now() },
  });

  const scrapped = await LastScrapedModel.find({ text });

  if (scrapped.length > 0) return true;

  // Save entry if it yet not exist
  await new LastScrapedModel({
    text,
    dateToDelete: new Date(new Date().getTime() + 3 * (24 * 60 * 60 * 1000)),
  }).save();

  return false;
};

export default scraped;
