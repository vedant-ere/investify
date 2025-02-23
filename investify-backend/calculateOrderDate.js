export default function getOrderDate(){
    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    return `${year}-${month+1}-${date}`;
}

export function getCurrentMySQLTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}  

// console.log(getOrderDate());