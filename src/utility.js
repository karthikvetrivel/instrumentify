// Create a function that takes a time in ms and returns a string formatted HH:MM:SS
export default formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    
    return `${hours}:${minutes}:${seconds}`;
};