type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
};

export enum Types {
    Update = 'UPDATE_DATA',
}

type SpecType = {
    data: any
}

type ProductPayload = {
    [Types.Update] : {
        data: any
    };

}

export type SpecActions = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export const AppReducer = (state: SpecType[], action: SpecActions) => {
    switch (action.type) {
        case Types.Update:
            return [
                ...state,
                {data: action.payload}
            ]
        default:
            return state;
    }
}