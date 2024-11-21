/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
const md5 = require('md5');
const axios = require('axios');

const constants = {
  PHP: '.php',
  BALTNET_URL: 'https://sms4.tcg.lt/external/'
};

const baltnetMethods = {
  GET_TIMESTAMP: {
    method: 'get/timestamp',
    parameters: {}
  },

  GET_BALANCE: {
    method: 'get/balance',
    parameters: {
      login: 'login',
      timestamp: 'timestamp'
    }
  },
  SEND_SMS: {
    method: 'get/send',
    parameters: {
      login: 'login',
      timestamp: 'timestamp',
      phone: 'phone',
      text: 'text',
      sender: 'sender',
      sendingTime: 'sendingTime'
    }
  }
};

const parametersHelper = function (apiKey) {
  return {
    list: [],

    apiKey,
    signature: null,

    with(name, value) {
      this.list.push({
        name,
        value
      });

      return this;
    },

    buildSignature() {
      this.list.sort((a, b) => a.name.localeCompare(b.name));

      let str = '';
      for (const listElement of this.list) {
        str += listElement.value;
      }

      this.signature = md5(str + this.apiKey);
      return this;
    },

    buildQuery(method) {
      this.with('signature', this.signature);
      let query = `${constants.BALTNET_URL + method}?`;
      let first = true;
      for (const listElement of this.list) {
        query += `${(first ? '' : '&') + listElement.name}=${this.addValue(
          listElement.name,
          listElement.value
        )}`;
        first = false;
      }

      this.clean();
      this.signature = null;

      return query;
    },

    addValue(name, value) {
      return name == 'text' ? encodeURIComponent(value) : value;
    },

    clean() {
      this.list = [];
    }
  };
};

module.exports = {
  getBalance: (apiKey, login) => {
    return axios
      .get(
        constants.BALTNET_URL +
          baltnetMethods.GET_TIMESTAMP.method +
          constants.PHP
      )
      .then((result) => result.data)
      .then((timestamp) => {
        const paramters = parametersHelper(apiKey);
        const query = paramters
          .with(baltnetMethods.GET_BALANCE.parameters.login, login)
          .with(baltnetMethods.GET_BALANCE.parameters.timestamp, timestamp)
          .buildSignature()
          .buildQuery(baltnetMethods.GET_BALANCE.method + constants.PHP);

        console.info(query);

        return axios.get(query);
      });
  },

  sendSms: (apiKey, login, phoneNumber, sender, text, time) => {
    return axios
      .get(
        constants.BALTNET_URL +
          baltnetMethods.GET_TIMESTAMP.method +
          constants.PHP
      )
      .then((result) => result.data)
      .then((timestamp) => {
        const paramters = parametersHelper(apiKey);
        const query = paramters
          .with(baltnetMethods.SEND_SMS.parameters.login, login)
          .with(baltnetMethods.SEND_SMS.parameters.timestamp, timestamp)
          .with(baltnetMethods.SEND_SMS.parameters.phone, phoneNumber)
          .with(baltnetMethods.SEND_SMS.parameters.sender, sender)
          .with(baltnetMethods.SEND_SMS.parameters.text, text)
          .buildSignature()
          .buildQuery(baltnetMethods.SEND_SMS.method + constants.PHP);

        console.info(query);

        return axios.get(query);
      });
  }
};
