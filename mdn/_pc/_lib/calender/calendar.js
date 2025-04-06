function generateCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const firstDay = new Date(year, month - 1, 1);
  const startingDay = firstDay.getDay();
  const endDate = new Date(year, month, 0).getDate();

  const calendarTable = document.getElementById("calendar");
  const tbody = calendarTable.querySelector("tbody");

  let calendarHTML = "";

  // 디폴트 이미지 경로
  const defaultImage = "/theme_madonna/_pc/_image/att2.png";
  const defaultImage2 = "/theme_madonna/_pc/_image/att1.png";

  let day = 1;
  // 달력 날짜 추가
  for (let i = 0; i < 6; i++) { // 6주(최대 6주)까지만 처리
    calendarHTML += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startingDay) {
        // 첫째 날 이전의 빈 칸
        calendarHTML += `<td class="att1"></td>`;
      } else if (day <= endDate) {
        // 실제 날짜
        let classList = "att1";
        if (dbDates.includes(day)) {
          classList += " special-date";
          calendarHTML += `<td class="${classList}"><span class="att2">${day}</span><img src="${defaultImage2}"/></td>`;
        } else {
          calendarHTML += `<td class="${classList}"><span class="att2">${day}</span><img src="${defaultImage}"/></td>`;
        }
        day++;
      } else {
        // 마지막 날 이후의 빈 칸
        calendarHTML += `<td class="att1"></td>`;
      }
    }
    calendarHTML += "</tr>";
    if (day > endDate) break; // endDate까지 날짜를 채우면 종료
  }

  tbody.innerHTML = calendarHTML;
  const monthTitle = document.querySelector('.att_month_title');
  monthTitle.innerText = `${year}-${month.toString().padStart(2, '0')}`;
}

generateCalendar(); // 페이지 로드 시 달력 생성
