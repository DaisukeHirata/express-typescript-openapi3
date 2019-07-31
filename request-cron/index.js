import axios from 'axios'

export const hello = async (event, context, callback) => {
  const res = await axios({
    method: "get",
    url: "https://XXX",
  })
  console.log(JSON.stringify(res));

  callback(null, {
    message: 'success',
    event
  });
}
