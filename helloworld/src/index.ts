import axios from 'axios';
import dotenv from 'dotenv';
import 'dotenv/config';
import { OpenAI } from 'langchain/llms';

// .env ファイルから環境変数を読み込む
dotenv.config();

// OpenAIのAPIキーを環境変数から取得

// LLMの準備
const llm = new OpenAI({ temperature: 0.9 });

// 指定のURLから情報を読み込んで指定の行動を実行する関数
const processURL = async (url: string) => {
  try {
    // URLからデータを取得
    const response = await axios.get(url);

    // データを取得したら、ここで適切な行動を実行する
    console.log('URLから取得したデータ:', response.data);

    // LLMにデータを入力として渡して応答を取得
    const llmResponse = await llm.call(`データ:${response.data}`); // データを適切な形式で使用
    console.log('LLMの応答:', llmResponse);
  } catch (error: any) {
    console.error('エラー:', error.message);
  }
};

// 指定のURLを指定して処理を開始
const targetURL =
  'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo'; // 実際のURLを指定
processURL(targetURL);
