import axios from 'axios';
import dotenv from 'dotenv';
import 'dotenv/config';
import { OpenAI } from 'langchain/llms';

// .env ファイルから環境変数を読み込む
dotenv.config();

// LLMの準備
const llm = new OpenAI({ temperature: 0.9 });

// 指定のURLから情報を読み込んで指定の行動を実行する関数
const processURL = async (url: string) => {
  try {
    // URLからデータを取得
    const response = await axios.get(url);

    // データを取得したら、ここで適切な行動を実行する
    //console.log('URLから取得したデータ:', response.data);

    // LLMにデータを入力として渡して応答を取得
    const llmResponse = await generateLLMResponse(response.data); // LLMモデルによる文生成
    console.log('LLMの応答:', llmResponse);
  } catch (error: any) {
    console.error('エラー:', error.message);
  }
};

// LLMモデルによる文生成
const generateLLMResponse = async (data: any) => {
  try {
    // 買い時と売り時の情報を生成するための文生成リクエスト
    const prompt = `データ:${data}\nあなたが買い時だと思う日時をdataからいくつか挙げてください。\nあなたが売り時だと思う日時をdataからいくつか挙げてください。`;

    // LLMに文生成リクエストを送信
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
