


export function convertTimeToFormat(utcDate: Date): string {
    // Parse the database time (assuming it's in UTC)
    // Convert to South Africa time (Pretoria time)
    const saTime = utcDate.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' });

    // Format the date as "May 16, 2024"
    const formattedDate = new Date(saTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return formattedDate;
}


export function formatTimeAgo(databaseTime: Date): string {
    const seconds = Math.floor((new Date().getTime() - databaseTime.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7); // Calculate weeks
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return 'just now';
    } else if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else if (days < 7) {
        return `${days}d ago`;
    } else if (weeks < 4) {
        return `${weeks}w ago`;
    } else if (months < 12) {
        return `${months}M ago`;
    } else {
        return `${years} years ago`;
    }
}

// Example usage:
// const databaseTime = '2024-05-12T11:00:00Z'; // Replace with your actual database time
// const userTimeZone = 'Africa/Johannesburg'; // Replace with your desired time zone
// const formattedTime = convertTimeToFormat(databaseTime);
// console.log(formattedTime); // Output: "May 12, 2024, 1:00 PM"
