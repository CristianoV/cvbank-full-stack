export default function generateRandomEAN13() {
  // Gerar 12 dígitos aleatórios
  let randomDigits = '';
  for (let i = 0; i < 12; i++) {
    randomDigits += Math.floor(Math.random() * 10);
  }

  // Calcular o dígito verificador
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum +=
      i % 2 === 0
        ? parseInt(randomDigits.charAt(i))
        : parseInt(randomDigits.charAt(i)) * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;

  // Concatenar os dígitos aleatórios com o dígito verificador
  const randomEAN13 = randomDigits + checkDigit;

  return randomEAN13;
}
