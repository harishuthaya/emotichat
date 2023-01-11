const { PythonShell } = require('python-shell');

const getEmotion = async (message) => {
  const options = {
    pythonPath: '/Users/harish/programming/emotion-detection/env/bin/python',
    scriptPath: __dirname,
    args: [message],
  };

  return new Promise((resolve) => {
    PythonShell.run('emotion.py', options, (err, res) => {
      if (err) throw err;
      resolve(res[1].substring(2, res[1].length - 2));
    });
  });

  //   const result = await new Promise((resolve, reject) => {
  //     PythonShell.run('emotion.py', options, (err, res) => {
  //       if (err) return reject(err);
  //       if (res) return resolve(res[1]);
  //     });
  //   });
  //   console.log('Result', result);
  //   return result;
};

module.exports = { getEmotion };
