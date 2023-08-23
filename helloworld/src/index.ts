import axios from 'axios';
import dotenv from 'dotenv';
import 'dotenv/config';
import { OpenAI } from 'langchain/llms';

dotenv.config();

const llm = new OpenAI({ temperature: 0.9 });

const alphaVantageKey = process.env.Alpha_Vantage_Key;

const Get5minData = async () => {
  try {
    const symbol = 'JPYUSD'; // 日本円とアメリカドル
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${alphaVantageKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Alpha Vantageエラー:', error);
    throw new Error('Alpha Vantageからデータを取得できませんでした。');
  }
};

const Judge5minData = async () => {
  try {
    const minuteData = await Get5minData();
    console.log('５分毎のデータ:', minuteData);

    const timestamps = Object.keys(minuteData['Time Series (5min)']);
    const prompt = `データ:${timestamps.join(
      ', '
    )}\nあなたが買い時だと思う日時をデータからどのデータを評価して選んだかを明確にして理由と共に一つ挙げてください。\nあなたが売り時だと思う日時をデータからどのデータを評価して選んだかを明確にして理由と共に一つ挙げてください。`;

    const llmResponse = await llm.call(prompt);
    console.log('LLMの応答:', llmResponse);
  } catch (error: any) {
    console.error('エラー:', error.message);
  }
};

const GetDailyData = async () => {
  try {
    const symbol = 'JPYUSD'; //日本円とアメリカドル
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${alphaVantageKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Alpha Vantageエラー:', error);
    throw new Error('Alpha Vantageからデータを取得できませんでした。');
  }
};

const JudgeDailyData = async () => {
  try {
    const dailyData = await GetDailyData();
    console.log('1日毎のデータ:', dailyData);

    const timestamps = Object.keys(dailyData['Time Series (Daily)']);
    const prompt = `データ:${timestamps.join(
      ', '
    )}\nあなたが買い時だと思う日時をデータからどのデータを評価して選んだかを明確にして理由と共に一つ挙げてください。\nあなたが売り時だと思う日時をデータからどのデータを評価して選んだかを明確にして理由と共に一つ挙げてください。`;

    const llmResponse = await llm.call(prompt);
    console.log('LLMの応答:', llmResponse);
  } catch (error: any) {
    console.error('エラー:', error.message);
  }
};

Judge5minData();
JudgeDailyData();
