
import { notification } from 'antd';
import { createContext, useContext, useMemo } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';


type UseNotificationReturnType = {
    contextHolder: React.ReactNode;
    openNotificationWithIcon: (type: NotificationType, message: string, description: string) => void;
};

type Props = {
    children: React.ReactElement;
}

const NotificationContext = createContext<UseNotificationReturnType | null>(null);
export const NotificationProvider = ({ children }: Props) => {


    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string = 'This is a success notification.') => {
        api[type]({
            message,
            description,
        });
    };

    const value = useMemo(() => ({
        contextHolder,
        openNotificationWithIcon
    }), [contextHolder]);


    return (
        <NotificationContext.Provider
            value={value}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};


export const useNotification
    = (): UseNotificationReturnType => {
        return useContext(NotificationContext)!;
    };