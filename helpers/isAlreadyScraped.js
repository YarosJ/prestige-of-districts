import mongoose from 'mongoose';
import '../models/LastScraped';

const LastScrapedModel = mongoose.model('LastScraped');

export default async (text) => {
  const scrapped = await LastScrapedModel.find({ text });
  if (scrapped.length > 0) return true;
  await new LastScrapedModel({ text }).save();
  return false;
};
