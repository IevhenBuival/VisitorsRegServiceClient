import IVisit from "@/types/visit";
import axios from "axios";

type GetVisitResponse = {
  visits: IVisit[];
};

const url = "https://fv3lr94tmg.execute-api.us-east-1.amazonaws.com/visit";

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
