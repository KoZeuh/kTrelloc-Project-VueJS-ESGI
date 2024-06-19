import { format } from 'date-fns';

export const formatDate = (dateString: string, dateFormat: string = 'dd/MM/yyyy') => {
    return format(new Date(dateString), dateFormat);
};