/*
 * @Author: George Zhao
 * @Date: 2021-10-25 23:17:58
 * @LastEditors: George Zhao
 * @LastEditTime: 2021-10-27 00:09:35
 * @Description:
 * @Email: 2018221138@email.szu.edu.cn
 * @Company: SZU
 * @Version: 1.0
 */

function getSeting_bykey(key) {}

function storeRecord(timeStamp, length) {
  let recordData = localStorage.getItem("recordData");
  if (recordData == null) {
    recordData = '{"data": {}}';
  }
  let dict_ = JSON.parse(recordData);
  dict_["data"][timeStamp] = length;
  localStorage.setItem("recordData", JSON.stringify(dict_));
}

function updateRecord(timeStamp, length) {}

updateRecord = storeRecord;

function getRecord(timeStamp) {
  let recordData = localStorage.getItem("recordData");
  if (recordData == null) {
    recordData = '{"data": {}}';
  }
  let dict_ = JSON.parse(recordData);
  return dict_["data"];
}

export { getSeting_bykey, storeRecord, updateRecord, getRecord };
