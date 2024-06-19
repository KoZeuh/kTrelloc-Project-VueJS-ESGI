import apiClient from '@/apiClient';

export const createCardToListId = async (token: string, listId: bigint) => {
    try {
        const response = await apiClient.post(`/board/list/card/create`, {listId}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'An unknown error occurred while adding a new card');
    }
}

export const updateTitle = async (token: string, listId: bigint, title: string) => {
    try {
        const response = await apiClient.put(`/board/list/update/title`, { listId, title }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}
 export const deleteList = async (token: string, listId: number) => {
    try {
        const response = await apiClient.delete(`/board/list/delete/${listId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
 }

export const duplicateListById = async (token: string, listId: bigint) => {
    try {
        const response = await apiClient.post(`/board/list/duplicate/${listId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}