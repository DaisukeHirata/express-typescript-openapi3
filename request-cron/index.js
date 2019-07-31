import axios from 'axios'

export const hello = async (event, context, callback) => {
  const res = await axios({
    method: "get",
    url: "https://xxx",
  })
  console.log(JSON.stringify(res.data));

  callback(null, {
    message: 'success',
    event
  });
}
