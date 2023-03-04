const ResponseHttp = {
  reply(body, statusCode, headers) {
    return {
      statusCode: statusCode || 200,
      headers: headers || { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body)
    };
  }
};

module.exports = ResponseHttp;