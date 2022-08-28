function projectDurationTime(a, b){
  let projectStartAt = new Date(a);
  let projectEndAt = new Date(b);

  let duration = projectEndAt - projectStartAt;

  //day duration
  
  let yearDuration = Math.floor(duration / (1000 * 60 * 60 * 24 * 30 * 12));

  if(yearDuration > 0){
    return `Duration: ${yearDuration} years`;
  } else {
    let monthDuration = Math.floor(duration / (1000 * 60 * 60 * 24 * 30));

    if (monthDuration > 0) {
      return `Duration: ${monthDuration} months`;
    } else {
      let weeksDuration = Math.floor(duration / (1000 * 60 * 60 * 24 * 7));

      if(weeksDuration > 0) {
        return `Duration: ${weeksDuration} weeks`;
      } else {
        let dayDuration = Math.floor(duration / (1000 * 60 * 60 * 24));

        if(dayDuration > 0) {
          return `Duration: ${dayDuration} days`;
        }
      }
    }
  }
}