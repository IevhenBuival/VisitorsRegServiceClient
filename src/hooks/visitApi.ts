import IVisit, { IVisitBody } from "@/types/visit";
import axios from "axios";

type GetVisitResponse = {
  visits: IVisit[];
};

const url = process.env.VUE_APP_SERVER_URL + "/visit";

export const getVisitsHook = async (): Promise<IVisit[]> => {
  const { status, data } = await axios.get<GetVisitResponse>(url, {
    headers: {
      Accept: "application/json",
    },
  });
  if (status === 200) return data.visits;
  const empty: IVisit[] = [];
  return empty;
};

export const deleteVisitHook = async (id: string): Promise<string> => {
  try {
    const { status } = await axios.delete(url + "/" + id, {});
    return "" + status;
  } catch (error) {
    throw new Error("Error to delete visitor id:" + id);
  }
};

export const postVisitHook = async (bodydata: IVisitBody): Promise<IVisit> => {
  try {
    const { data } = await axios.post(url, bodydata);
    return data.visit;
  } catch (error) {
    throw new Error("Error to create visitor");
  }
};

export const putVisitHook = async (
  id: string,
  bodydata: IVisitBody
): Promise<IVisit> => {
  try {
    const { data } = await axios.put(url + "/" + id, bodydata);
    return data.visit;
  } catch (error) {
    throw new Error("Error to create visitor");
  }
};
