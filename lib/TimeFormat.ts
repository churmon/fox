


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
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - databaseTime.getTime();

    // Convert milliseconds to seconds
    const secondsAgo = Math.floor(timeDifference / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo}s ago`;
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo}m ago`;
    } else {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo}h ago`;
    }
}

// Example usage:
// const databaseTime = '2024-05-12T11:00:00Z'; // Replace with your actual database time
// const userTimeZone = 'Africa/Johannesburg'; // Replace with your desired time zone
// const formattedTime = convertTimeToFormat(databaseTime);
// console.log(formattedTime); // Output: "May 12, 2024, 1:00 PM"
