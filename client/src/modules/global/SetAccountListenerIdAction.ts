export const SetAccountListenerIdType: string = "SET_ACCOUNT_LISTENER_ID";

export default interface SetAccountListenerIdAction {
    type: typeof SetAccountListenerIdType
    payload: {
        accountListenerId: [string, string, string]
    }
}

export function createSetAccountListenerIdAction(accountListenerId: [string, string, string]): SetAccountListenerIdAction {
    return {
        type: SetAccountListenerIdType,
        payload: {
            accountListenerId: accountListenerId
        }
    }
}
