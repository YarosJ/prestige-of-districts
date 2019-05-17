import * as mongoose from 'mongoose';
import '../models/LastScraped';

const LastScrapedModel = mongoose.model('LastScraped');

export default async (text): Promise <boolean> => {
  await LastScrapedModel.deleteMany({
    dateToDelete: { $lt: Date.now() },
  });

  const scrapped = await LastScrapedModel.find({ text });

  if (scrapped.length > 0) return true;

  await new LastScrapedModel({
    text,
    dateToDelete: new Date(new Date().getTime() + 3 * (24 * 60 * 60 * 1000)),
  }).save();

  return false;
};
