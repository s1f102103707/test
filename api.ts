import axios from 'axios';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiKey = 'apikey'; // あなたの実際のAPIキーを設定してください
const inputData = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'あなたは悲観的な人間です。以下の質問にその性格に沿って回答してください。' },//contentの中で性格を設定する
    { role: 'user', content: '暇な大学生の平日のTwitter上での行動のストーリーを作ってください。300文字以内でお願いします。例えば朝10時に起床して、14時にお昼ご飯を食べたというようにしてください。' }//contentの中で質問の内容を設定する
  ]
};
const ranking = 'しかしいいことが一つあった'
inputData.messages.push({ role: 'user', content: ranking });

axios.post(apiEndpoint, inputData, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    // console.log('API Response:', response.data);
    const message = response.data.choices[0]?.message?.content;
    if (message) {
      console.log('Response:', message);
      // exportMessage = message;
    } else {
    //   const totalTokens = response.data.usage?.total_tokens;
    //   console.log('Total Tokens:', totalTokens);
      console.error('Error: Response message not found.');
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
