// Helper function to check if two dates are consecutive
const isConsecutive = (date1: Date, date2: Date) => {
    const timeDiff = date2.getTime() - date1.getTime();
    const oneDayInMillis = 1000 * 60 * 60 * 24;
    return timeDiff === oneDayInMillis;
  };
  
  // Calculate the current streak and the highest streak
 export const calculateStreak = (completed: Array<{ submissionDate: Date }>) => {
    let currentStreak = 0;
    let highestStreak = 0;
    let streak = 0;
  
    completed.sort((a, b) => a.submissionDate.getTime() - b.submissionDate.getTime()); // Sort by submissionDate
  
    for (let i = 0; i < completed.length; i++) {
      const currentSubmissionDate = completed[i].submissionDate;
      if (i > 0 && isConsecutive(completed[i - 1].submissionDate, currentSubmissionDate)) {
        streak += 1; // Increment streak if consecutive
      } else {
        streak = 1; // Reset streak
      }
  
      currentStreak = streak;
      highestStreak = Math.max(highestStreak, streak);
    }
  
    return { currentStreak, highestStreak };
  };
  