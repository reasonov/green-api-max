export type Credentials = {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
}

export type InstanceState =
  | 'notAuthorized'
  | 'authorized'
  | 'blocked'
  | 'starting'
  | 'suspended'
  | 'pendingPassword'

export type GetStateInstanceResponse = {
  stateInstance: InstanceState
}

export type SetSettingsRequest = {
  webhookUrl: string
  incomingWebhook: 'yes' | 'no'
}

export type CheckAccountSuccess = {
  exist: boolean
  chatId: string
  fromCache: boolean
}

export type CheckAccountFailure = {
  status: false
  reason: string
}

export type CheckAccountResponse = CheckAccountSuccess | CheckAccountFailure

export type SendMessageRequest = {
  chatId: string
  message: string
}

export type SendMessageResponse = {
  idMessage: string
}

export type ReceiveNotificationResponse = {
  receiptId: number
  body: NotificationBody
} | null

export type DeleteNotificationResponse = {
  result: boolean
  reason: string
}

export type NotificationBody = {
  typeWebhook: string
  timestamp: number
  idMessage?: string
  senderData?: SenderData
  messageData?: MessageData
}

export type SenderData = {
  chatId: string
  chatName?: string
  chatType?: string
  sender?: string
  senderName?: string
  senderType?: string
  senderContactName?: string
  senderPhoneNumber?: number
}

export type MessageData = {
  typeMessage: string
  textMessageData?: {
    textMessage?: string
  }
  extendedTextMessageData?: {
    text?: string
    textMessage?: string
  }
}

export function isCheckAccountFailure(
  response: CheckAccountResponse,
): response is CheckAccountFailure {
  return 'status' in response && response.status === false
}
