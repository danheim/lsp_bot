// node modules
const Telegraf = require('telegraf');
require('dotenv').config();

// helpers
const { logger } = require('./lib/helpers');
const models = require('./models');

const initBot = async () => {
  await models.sequelize.sync();
  await models.sequelize.authenticate();
  console.log(' 🚀🚀🚀 🚀🚀🚀 🚀🚀🚀\n', '🚀 Database looks fine');

  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.use(logger);
  bot.start(ctx => ctx.reply('Привет'));

  bot.on('text', async ctx => {
    try {
      const { text } = ctx.message;
      if (text.startsWith('аккаунт')) {
        const accountId = text.split(' ')[1];
        if (!accountId) return;

        let where = null;

        if (!Number.isNaN(+accountId)) {
          where = { id: accountId };
        } else {
          where = { login: accountId }
        }

        const account = await models.Account.findOne({
          where,
          include: [
            { model: models.Char },
            {
              model: models.Admin,
              attributes: ['rank'],
              as: 'admin'
            },
          ]
        });

        if (!account) {
          return await ctx.reply('Аккаунт не найден');
        }

        const { id, login, Chars: chars, admin } = account;

        let info = 'ID: ' + id
          + '\nЛогин: ' + login
          + '\nАдминистратор: ' + (admin ? `Да (${admin.rank} уровень)` : 'Нет');

        if (chars.length > 0) {
          info += '\n\nПерсонажи:';

          chars.forEach((char, i) => {
            info += `\n${i + 1}. ID: ${char.id}, Ник: ${char.login}`
          });
        }

        if (account) {
          return await ctx.reply(info);
        } else {
          return await ctx.reply('Account not found');
        }
      }

      else if (text.startsWith('персонаж')) {
        const charId = text.split(' ')[1];
        if (!charId) return;

        const char = await models.Char.findOne({
          where: { id: charId }
        });

        if (!char) return await ctx.reply('Персонаж не найден');

        const { id, login, cash, bankmoney, number } = char;
        let info = 'ID: ' + id
          + '\nНик: ' + login
          + '\nНаличные: ' + cash + '$'
          + '\nВ банке: ' + bankmoney + '$'
          + '\nТелефон: ' + (number === '0' ? 'Нет' : number);

        await ctx.reply(info);
      }

    } catch (e) {
      console.log('Some error happened (on: text)');
      console.log(e.message);а
    }
  });

  bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
    console.log('Я тебя слушаю');
  });

  await bot.launch();
};

initBot().then();
