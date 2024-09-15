let months = [
    'Jan.',
    'Fev.',
    'Mar.',
    'Avr.',
    'Mai.',
    'Jui.',
    'Juil.',
    'Aou.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.'
];
let days = [
    'Dim.',
    'Lun.',
    'Mar.',
    'Mer.',
    'Jeu.',
    'Ven.',
    'Sam.'
];
export function parseDate(date){
    let d = new Date(date);
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} - ${d.getHours() < 10 ? "0" : ""}${d.getHours()}H : ${d.getMinutes()}Min`
}