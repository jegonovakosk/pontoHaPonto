import api from "./api";

export const postWorkHours = async (obj) => {
  const response = await api.post("/work-hours", obj);
  return response.data;
};
export const putWorkHours = async (obj) => {
  const response = await api.put(`/work-hours/${obj.date}`, obj);
  return response.data;
};
export const getWorkHours = async (date) => {
  const response = await api.get(
    `/work-hours?startDate=${date}&endDate=${date}`
  );
  return response.data;
};
export const getWorkHoursMonths = async (dateStart, dateEnd) => {
  const response = await api.get(
    `/work-hours?startDate=${dateStart}&endDate=${dateEnd}`
  );
  return response.data;
};
