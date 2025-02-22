export default async function generateRandomSequence(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomSequence = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomSequence += characters.charAt(randomIndex);
  }  
  return randomSequence;
} 

// console.log(await generateRandomSequence(16));