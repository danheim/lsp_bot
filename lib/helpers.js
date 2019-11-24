const logger = async (ctx, next) => {
  try {
    const { text, from: { id, first_name, username } } = ctx.message;
    console.log(`${username} (${first_name}) [${id}]: ${text}`);
  } catch (e) {
    console.log('Some error happened (logger function)');
  }
  next();
};

module.exports = {
  logger,
};
