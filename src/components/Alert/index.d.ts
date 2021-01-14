import * as React from "react";

export type AlertType = 'default' | 'success' | 'info' | 'danger' | 'warning';

export interface ButtonProps {
    type: AlertType;
    text: string;
    onPress?(): void;
}

export interface AlertProps {
    type?: AlertType;
    title: string;
    detail?: string;
    buttons?: Array<ButtonProps>;
}

export function showAlert(options: AlertProps): void;
export function closeAlert(): void;

export default class Alert extends React.Component<> { }
