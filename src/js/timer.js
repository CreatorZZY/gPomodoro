/*
 * @Author: George Zhao
 * @Date: 2021-10-25 23:20:33
 * @LastEditors: George Zhao
 * @LastEditTime: 2021-10-26 21:01:00
 * @Description:
 * @Email: 2018221138@email.szu.edu.cn
 * @Company: SZU
 * @Version: 1.0
 */
function timestamp_to_sec(timestamp) {
  return Math.floor(timestamp / 1000);
}

function substra_time(timestamp_target, timestamp_now = undefined) {
  if (timestamp_now == undefined) {
    timestamp_now = Date.now();
  }
  let timeresult = timestamp_target - timestamp_now;
  timeresult = timestamp_to_sec(timeresult);
  return {
    min: Math.floor(timeresult / 60),
    sec: timeresult % 60,
  };
}

export { substra_time, timestamp_to_sec };
