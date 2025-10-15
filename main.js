function getWeekNumber(date) {
    // Input: Date()
    // Output: Week number, type Integer.
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function getWeekDates(date) {
    // Input: Date()
    // Output: both in Norwegian format for month.
    //  .monday: dd/MM
    //  .sunday: dd/MM/yyyy
    const d = new Date(date);
    const day = d.getDay(); 
    const diffToMonday = (day + 6) % 7; 
    const monday = new Date(d);
    monday.setDate(d.getDate() - diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const mondayStr = new Intl.DateTimeFormat('nb-NO', { day: 'numeric', month: 'long' }).format(monday);
    const sundayStr = new Intl.DateTimeFormat('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' }).format(sunday);

    return {
        monday: mondayStr,
        sunday: sundayStr
    };
}

const today = new Date();

const weekNum = getWeekNumber(today);
const weekString = `Uke ${weekNum}`
const weekDates = getWeekDates(today);
document.getElementById("week-container").textContent = weekString;
document.getElementById("dates-container").textContent = `${weekDates.monday} - ${weekDates.sunday}`;
document.title = weekString;