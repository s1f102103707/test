import axios from 'axios';
import dotenv from 'dotenv';
import 'dotenv/config';
import { OpenAI } from 'langchain/llms';
dotenv.config();
const llm = new OpenAI({ temperature: 0.9 });
const processURL = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log('URLから取得したデータ:', response.data);

    const llmResponse = await generateLLMResponse(response.data);
    console.log('LLMの応答:', llmResponse);
  } catch (error: any) {
    console.error('エラー:', error.message);
  }
};

const generateLLMResponse = async (data: any) => {
  try {
    const prompt = `データ:${data}\nあなたが買い時だと思う日時をdataからいくつか挙げてください。\nあなたが売り時だと思う日時をdataからいくつか挙げてください。`;

    const llmResponse = await llm.call(prompt);
    return llmResponse;
  } catch (error) {
    console.error('LLMエラー:', error);
    return 'LLMの文生成中にエラーが発生しました。';
  }
};

// 指定のURLを指定して処理を開始
const targetURL =
  'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo'; // 実際のURLを指定
processURL(targetURL);
