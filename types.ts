export enum NotifyLevel {
    CRITICAL = 'critical', 
    NORMAL = 'normal',
    LOW = 'low'
}


export type NotificationBuilder = {
    expirationTime?: number;
    iconPath?: string;
    urgency?: NotifyLevel;
    wait?: boolean;
    sound?: string;
    title: string;
    message: string;
}
