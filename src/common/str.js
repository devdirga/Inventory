const Str = {
  greeting: (time = new Date()) => {
    const greetingMessage =
      time.getHours() >= 4 && time.getHours() < 12 // after 4:00AM and before 12:00PM
        ? 'Good Morning'
        : time.getHours() >= 12 && time.getHours() <= 17 // after 12:00PM and before 6:00pm
          ? 'Good Afternoon'
          : time.getHours() > 17 || time.getHours() < 4 // after 5:59pm or before 4:00AM (to accommodate night owls)
            ? 'Good Evening' // if for some reason the calculation didn't work
            : 'Welcome';
    return greetingMessage;
  },
};

export default Str;
