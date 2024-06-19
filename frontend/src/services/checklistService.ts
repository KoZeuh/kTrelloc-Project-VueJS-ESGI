import apiClient from '@/apiClient';

export const updateTitle = async (token: string, checklistId: bigint, title: string) => {
    try {
        const response = await apiClient.put(`/board/checklist/update/title`, { checklistId, title }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteChecklist = async (token: string, checklistId: bigint) => {
    try {
        const response = await apiClient.delete(`/board/checklist/delete/${checklistId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}



export const addChecklistItem = async (token: string, checklistId: BigInt) => {
    try {
        const response = await apiClient.post(`/board/checklist/item/add/`, { checklistId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteChecklistItem = async (token: string, itemId: bigint) => {
    try {
        const response = await apiClient.delete(`/board/checklist/item/delete/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateStateCheckListItemById = async (token: string, itemId: bigint, state: boolean) => {
    try {
        const response = await apiClient.put(`/board/checklist/item/update/state`, { itemId, state }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}