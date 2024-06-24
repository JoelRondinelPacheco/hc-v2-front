import { NewSaleServicesState } from "@/context/new-sale.context";
import { recordsStarter, servicesSelectedByPage } from "../reducer.utils";
import { RecordPage, ServicesPage } from "@/domain/sale.domain";
import { record } from "zod";
import { Pageable } from "@/domain/commons.domain";
import { ServiceEntity } from "@/domain/service.domain";

interface ServicesStarter {
  type: "SERVICES_STARTER";
  payload: number;
}

interface ChangePage {
  type: "CHANGE_PAGE";
  payload: Pageable;
}

type SelectServicePayload = {
  newRecord: Record<string, boolean>;
  services: ServiceEntity[];
  pageable: Pageable;
};
interface SelectService {
  type: "SELECT_SERVICE";
  payload: SelectServicePayload;
}

type RemoveServicePayload = {
  indexPage: number;
  indexService: number;
  itemId: number;
};
interface RemoveService {
  type: "REMOVE_SERVICE";
  payload: RemoveServicePayload;
}

export type NewSaleServicesReducerAction =
  | ServicesStarter
  | ChangePage
  | SelectService
  | RemoveService;

export type NewSaleServicesReducerType = (
  state: NewSaleServicesState,
  action: NewSaleServicesReducerAction
) => NewSaleServicesState;

const newSaleServicesReducer: NewSaleServicesReducerType = (state, action) => {
  switch (action.type) {
    case "SERVICES_STARTER":
      return {
        ...state,
        serviceRecords: recordsStarter(action.payload, state.serviceRecords),
       services: servicesStarter(action.payload, state.services),
      };
    case "CHANGE_PAGE":
        //todo check if page exists
        let servicesPageExists: boolean = state.services[action.payload.pageIndex] !== null && state.services[action.payload.pageIndex] !== undefined
        if (!servicesPageExists) {
            state.services.push({
                pageIndex: action.payload.pageIndex,
                services: []
            })
        }
        let recordPageExists: boolean = state.serviceRecords[action.payload.pageIndex] !== null && state.serviceRecords[action.payload.pageIndex] !== undefined
        if (!recordPageExists) {
            state.serviceRecords.push({
                pageIndex: action.payload.pageIndex,
                record: {}
            })
        }
      return {
        ...state,
        currentServicePageRecord: {...state.serviceRecords[action.payload.pageIndex].record},
        servicesPagination: { ...action.payload },
        services: [...state.services],
        serviceRecords: [...state.serviceRecords]
      };
    case "SELECT_SERVICE":
      console.log("SELECT SERVICE");
      const { newRecord, pageable, services } = action.payload;
      const selectServiceNewRecords: RecordPage[] = state.serviceRecords.map(
        (s) =>
          s.pageIndex === pageable.pageIndex ? { ...s, record: newRecord } : s
      );
      const newServices: ServiceEntity[] = servicesSelectedByPage(
        pageable,
        newRecord,
        services
      );
      const newServicesFinal = state.services.map((s) =>
        s.pageIndex === pageable.pageIndex ? { ...s, services: newServices } : s
      );
      return {
        ...state,
        serviceRecords: selectServiceNewRecords,
        services: newServicesFinal,
        currentServicePageRecord: newRecord,
      };
    case "REMOVE_SERVICE":
      const { indexPage, indexService, itemId } = action.payload;
      const eqRecordId = getEquivalentRecordId(
        indexPage,
        itemId,
        state.servicesPagination
      );
      let newServicesList: ServicesPage[] = state.services.map((s) => {
        if (s.pageIndex === action.payload.indexPage) {
          let servicesF = s.services.filter(
            (s) => s.id !== action.payload.itemId
          );
          return { ...s, services: servicesF };
        } else {
          return s;
        }
      });

      let removeServiceNewRecords: RecordPage[] = state.serviceRecords.map(
        (r) => {
          if (r.pageIndex === action.payload.indexPage) {
            let filteredRecord: Record<string, boolean> = {};
            for (const [key, value] of Object.entries(r.record)) {
              if (key !== eqRecordId.toString()) {
                filteredRecord[key] = value;
              }
            }
            return { ...r, record: filteredRecord };
          } else {
            return r;
          }
        }
      );

      let finalLocalRed;
      if (state.servicesPagination.pageIndex === action.payload.indexPage) {
        finalLocalRed = {
          ...removeServiceNewRecords[action.payload.indexPage].record,
        };
      } else {
        finalLocalRed = state.currentServicePageRecord;
      }

      return {
        ...state,
        services: newServicesList,
        serviceRecords: removeServiceNewRecords,
        currentServicePageRecord: finalLocalRed,
      };
    default:
      return { ...state };
  }
};

export default newSaleServicesReducer;

function servicesStarter(total: number, prev: ServicesPage[]): ServicesPage[] {
  /*console.log("utils");
  let servicesStarter: ServicesPage[] = [];
  for (let i = 0; i < total; i++) {
    console.log(i)
    console.log(prev[i])
    if (prev[i] !== null && prev[i] !== undefined) {
      console.log("En for: " + i);
      console.log(prev[i]);
      servicesStarter.push(prev[i]);
    } else {
      servicesStarter.push({ pageIndex: i, services: [] });
    }
  }
  return servicesStarter;*/
  return [...prev]
}

function getEquivalentRecordId(
  indexPage: number,
  itemId: number,
  pageable: Pageable
) {
  let pageSize = pageable.pageSize;
  let resto = itemId % pageSize;
  if (resto !== 0) {
    return resto - 1;
  } else {
    return pageSize - 1;
  }
}
