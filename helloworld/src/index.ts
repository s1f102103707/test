import axios from 'axios';
import dotenv from 'dotenv';
import 'dotenv/config';
import { OpenAI } from 'langchain/llms';

dotenv.config();

// LLMの準備
const llm = new OpenAI({ temperature: 0.9 });

// Alpha Vantage APIキーを環境変数から取得
const alphaVantageKey = process.env.Alpha_Vantage_Key;

// Alpha Vantageからリアルタイム情報を取得する関数
const fetchRealTimeData = async () => {
  try {
    const symbol = 'EURUSD'; // 通貨ペアを指定
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${alphaVantageKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Alpha Vantageエラー:', error);
    throw new Error('Alpha Vantageからデータを取得できませんでした。');
  }
};

// 指定の日時を元にLLMに買い時と売り時を判断させる関数
const processRealTimeData = async () => {
  try {
    const realTimeData = await fetchRealTimeData();
    console.log('リアルタイムデータ:', realTimeData);

    // 日時情報を抽出してLLMに渡す
    const timestamps = Object.keys(realTimeData['Time Series (5min)']);
    const prompt = `データ:${timestamps.join(
      ', '
    )}\nあなたが買い時だと思う日時をデータからいくつかどのデータを評価して選んだかを明確にした理由と共に挙げてください。\nあなたが売り時だと思う日時をデータからいくつかどのデータを評価して選んだかを明確にした理由と共に挙げてください。`;

    const llmResponse = await llm.call(prompt);
    console.log('LLMの応答:', llmResponse);
  } catch (error: any) {
    console.error('エラー:', error.message);
  }
};

// リアルタイムデータを取得して買い時と売り時を判断させる
processRealTimeData();

// Alpha Vantageから1日おきにリアルタイム情報を取得する関数
const fetchDailyData = async () => {
  try {
    const symbol = 'EURUSD'; // 通貨ペアを指定
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${alphaVantageKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Alpha Vantageエラー:', error);
    throw new Error('Alpha Vantageからデータを取得できませんでした。');
  }
};

// 指定の日時を元にLLMに買い時と売り時を判断させる関数
const processDailyData = async () => {
  try {
    const dailyData = await fetchDailyData();
    console.log('1日おきのデータ:', dailyData);

    // 日時情報を抽出してLLMに渡す
    const timestamps = Object.keys(dailyData['Time Series (Daily)']);
    const prompt = `データ:${timestamps.join(
      ', '
    )}\nあなたが買い時だと思う日時をデータからいくつかどのデータを評価して選んだかを明確にした理由と共に挙げてください。\nあなたが売り時だと思う日時をデータからいくつかどのデータを評価して選んだかを明確にした理由と共に挙げてください。`;

    const llmResponse = await llm.call(prompt);
    console.log('LLMの応答:', llmResponse);
  } catch (error: any) {
    console.error('エラー:', error.message);
  }
};

// 1日おきのデータを取得して買い時と売り時を判断させる
processDailyData();
