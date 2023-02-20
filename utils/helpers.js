module.exports = {
  format_date: (date) =>
  {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return  date.toLocaleDateString('en-us', options);
  },
  format_time: (date) =>
  {
    return newTime = date.toLocaleTimeString('en-US');
  },
  format_amount: (amount) =>
  {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () =>
  {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7)
    {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.4)
    {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else
    {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    }
  },
  post_tease: str =>
  {
    const first25 = str.slice(0, 50);
    return first25;
  },
};
