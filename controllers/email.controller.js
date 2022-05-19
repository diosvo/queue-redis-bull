const controller = {
  send: async (request, response) => {
    const { message, ...rest } = request.body;
    await send_email({
      ...rest,
      html: `<div>${message}</div>`,
    });
    response.send("OK");
  },
};

module.exports = controller;
