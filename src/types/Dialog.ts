type EventType = "Ok" | "Cancel";

export interface IDialogProps {
  type: string;
  visitId?: string;
}

export interface IDialogItem {
  event: EventType;
  visitId?: string;
}

export default interface IDialog {
  show: boolean;
  dialogProps: IDialogProps;
}
