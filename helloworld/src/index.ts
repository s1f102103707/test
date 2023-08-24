import axios from 'axios';
import dotenv from 'dotenv';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from 'langchain/prompts';

dotenv.config(); // dotenvの初期化はここで行う

const alphaVantageKey = process.env.Alpha_Vantage_Key;

const Get5minData = async () => {
  try {
    const symbol = 'JPYUSD';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${alphaVantageKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Alpha Vantageエラー:', error);
    throw new Error('Alpha Vantageからデータを取得できませんでした。');
  }
};

const runTemplate = async () => {
  const minuteData = await Get5minData();
  const timestamps = Object.keys(minuteData['Time Series (1min)']);
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(`あなたは{role}です。`),
    HumanMessagePromptTemplate.fromTemplate(
      '{input}をもとにあなたが買い時だと思う日時をデータから一つ挙げてください。'
    ),
  ]);

  const chat = new ChatOpenAI({ temperature: 0 });
  const prompt = await chatPrompt.formatPromptValue({ role: '堅実な性格', input: timestamps });
  const messages = prompt.toChatMessages();

  const res = await chat.call(messages);
  console.log(res);
};

runTemplate();