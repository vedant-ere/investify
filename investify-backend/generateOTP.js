export default async function generateOTP(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}