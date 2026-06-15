const calculateNextOccurrence = (dateStr, repeat) => {
  const targetDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // FIX 1: Force the incoming database date to match local midnight hours
  const nextOccurrence = new Date(targetDate);
  nextOccurrence.setHours(0, 0, 0, 0);

  if (repeat === 'once') {
    return nextOccurrence;
  } 

  nextOccurrence.setFullYear(today.getFullYear());

  if (repeat === 'yearly') {
    if (nextOccurrence < today) {
      nextOccurrence.setFullYear(today.getFullYear() + 1);
    }
  } else if (repeat === 'monthly') {
    nextOccurrence.setMonth(today.getMonth());
    if (nextOccurrence < today) { 
      nextOccurrence.setMonth(today.getMonth() + 1);
    }
  }

  return nextOccurrence;
};

const isWithinDays = (nextOccurrence, daysAhead) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(today);
  target.setDate(today.getDate() + daysAhead);

  // FIX 2: Compare year, month, and date directly instead of raw timestamps
  return (
    nextOccurrence.getFullYear() === target.getFullYear() &&
    nextOccurrence.getMonth() === target.getMonth() &&
    nextOccurrence.getDate() === target.getDate()
  );
};
 
module.exports = { calculateNextOccurrence, isWithinDays };