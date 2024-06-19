import apiClient from '@/apiClient';

export const addTagToCardId = async (token: string, cardId: bigint, tagId: bigint) => {
    try {
        const response = await apiClient.post(`/board/tag/create`, {cardId, tagId}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteTagById = async (token: string, tagId: bigint) => {
    try {
        const response = await apiClient.delete(`/board/tag/delete/${tagId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getTags = async (token: string) => {
    try {
        const response = await apiClient.get('/board/tag/getAll', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}