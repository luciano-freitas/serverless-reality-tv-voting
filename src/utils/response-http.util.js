const ResponseHttp = {

  reply(body, statusCode, headers) {
    console.log('[ResponseHttp][reply]', body);
    return {
      statusCode: statusCode || 200,
      headers: headers || { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body)
    };
  }
};

module.exports = ResponseHttp;