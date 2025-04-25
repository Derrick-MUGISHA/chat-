// lib/encryption.ts
export async function generateKeyPair() {
  try {
    // Generate an RSA key pair
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );

    // Export the public key to a format that can be stored in the database
    const publicKeyExported = await window.crypto.subtle.exportKey(
      "spki",
      keyPair.publicKey
    );

    // Export the private key to a format that can be stored securely in localStorage
    const privateKeyExported = await window.crypto.subtle.exportKey(
      "pkcs8",
      keyPair.privateKey
    );

    // Convert to base64 for storage
    const publicKeyBase64 = btoa(
      String.fromCharCode(...new Uint8Array(publicKeyExported))
    );
    
    const privateKeyBase64 = btoa(
      String.fromCharCode(...new Uint8Array(privateKeyExported))
    );

    return {
      publicKey: publicKeyBase64,
      privateKey: privateKeyBase64,
    };
  } catch (error) {
    console.error("Error generating key pair:", error);
    throw new Error("Failed to generate encryption keys");
  }
}

export async function importPublicKey(publicKeyBase64: string) {
  const binaryString = atob(publicKeyBase64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return window.crypto.subtle.importKey(
    "spki",
    bytes.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );
}

export async function importPrivateKey(privateKeyBase64: string) {
  const binaryString = atob(privateKeyBase64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return window.crypto.subtle.importKey(
    "pkcs8",
    bytes.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );
}