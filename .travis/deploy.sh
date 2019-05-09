#!/usr/bin/env bash

ENCRYPTED_CERT_P12=encrypted.cert.p12
DECRYPTED_CERT=cert.pem

# download encrypted certificate
curl -L -o "${ENCRYPTED_CERT_P12}" ${CSC_LINK}

# decode decryption password for certificate
export CSC_KEY_PASSWORD=$(echo ${BASE64_CSC_KEY_PASSWORD} | base64 -D)

# decrypt certificate
openssl pkcs12 -in "${ENCRYPTED_CERT_P12}" -nodes -out "${DECRYPTED_CERT}" -password pass:${CSC_KEY_PASSWORD}

# add decrypted certificate as trusted cert to keychain
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "${DECRYPTED_CERT}"

# build and deploy artifacts
npm run electron:prod
