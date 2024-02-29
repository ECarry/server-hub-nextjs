const timeAgo = (date: Date) => {
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - date.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);

  if (elapsedHours >= 24) {
    const days = Math.floor(elapsedHours / 24);
    return `${days} days ago`;
  } else if (elapsedHours >= 1) {
    return `${elapsedHours} hours ago`;
  } else if (elapsedMinutes >= 1) {
    return `${elapsedMinutes} minutes ago`;
  } else {
    return "Just now";
  }
};

export default timeAgo;
