
formatjs extract 'src/**/*.ts*' --out-file src/locales/message.json --ignore 'src/**/*.d.ts' --format scripts/format.js --id-interpolation-pattern '[sha512:contenthash:base64:6]'
formatjs compile src/locales/message.json --out-file src/locales/zh-CN.json --format scripts/format.js
formatjs compile src/locales/message.json --out-file src/locales/en-US.json --format scripts/format.js
rm -rf src/locales/message.json
