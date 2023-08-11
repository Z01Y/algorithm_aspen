// 给定的5个时间段
const events = [
  { start: new Date('7/10/2023 10:15'), end: new Date('7/11/2023 18:15') },
  { start: new Date('7/10/2023 19:39'), end: new Date('7/12/2023 3:39') },
  { start: new Date('7/11/2023 9:12'), end: new Date('7/12/2023 15:12') },
  { start: new Date('7/12/2023 3:00'), end: new Date('7/13/2023 11:00') },
  { start: new Date('7/12/2023 10:19'), end: new Date('7/13/2023 15:07') },
];

// 根据开始时间排序
events.sort((a, b) => a.start - b.start);

// 计算交集
const intersections = [];
let currentIntersection = { start: events[0].start, end: events[0].end };

for (let i = 1; i < events.length; i++) {
  if (events[i].start <= currentIntersection.end) {
    currentIntersection.end = Math.min(currentIntersection.end, events[i].end);
  } else {
    intersections.push(currentIntersection);
    currentIntersection = { start: events[i].start, end: events[i].end };
  }
}

intersections.push(currentIntersection);

// 计算每个交集中有多少个overlap的events
for (let intersection of intersections) {
  const overlappingEvents = events.filter(
    (event) =>
      event.start <= intersection.end && event.end >= intersection.start
  );

  console.log(
    `交集 ${formatDate(intersection.start)} ~ ${formatDate(
      intersection.end
    )} 中有 ${overlappingEvents.length} 个overlap的events`
  );
}

// 格式化日期函数
function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
