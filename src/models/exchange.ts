import { Schema, model, Model, Document } from 'mongoose';
import { Decimal128 } from 'bson';

export interface IExchange extends Document {
  banks: [
    {
      name: string,
      url: string,
      buy?: number,
      sell?: number
    }
  ],
  createdAt: Date
};

export const ExchangeSchema = new Schema({
  banks: [
    {
      name: String,
      url: String,
      buy:  { type: Decimal128, default: 0 },
      sell: { type: Decimal128, default: 0 }
    }
  ]
}, { timestamps: true });

const Exchange : Model<IExchange> = model<IExchange>("Exchange", ExchangeSchema);
export default Exchange;
