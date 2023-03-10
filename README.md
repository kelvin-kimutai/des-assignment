# Secure Remote Communication Using DES Encryption Algorithm

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This is an implementation of an encryption system using DES algorithm with a key transfer mechanism included that facilitates secure and automated message transfer.

## Features

- Encryption and decryption over two web apps using DES algorithm.
- The private key is sent as an OTP via an SMS.
- The encrypted message is sent via email.
- The receiver enters the same key to decrypt the received message accurately

## Technologies Used

- React and Next JS 12 – Libraries used for building and laying out visual HTML components
- Express JS - A back end web application framework for building RESTful APIs with Node.js
- Nodemailer - A module for Node.js applications to allow easy as cake email sending.
- Lotus Bulk SMS - A service offering complete end-to-end Bulk SMS solutions.
- Vercel – A cloud as a platform service used for deploying web apps and servers.

## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/kelvin-kimutai/des-assignment.git
    npm install
    npm run dev

Note: If you are running on Windows run install --noptional flag (i.e. `npm install --no-optional`) which will skip installing fsevents.
