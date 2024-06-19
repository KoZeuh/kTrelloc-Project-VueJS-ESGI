import apiClient from '@/apiClient';

export const getBoardsByUser = async (token: string) => {
    try {
        const response = await apiClient.get('/board/getAllByUser', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBoardContentById = async (token: string, boardId: bigint) => {
    try {
        const response = await apiClient.get(`/board/get/${boardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createBoard = async (token: string, boardData: any) => {
    try {
        const response = await apiClient.post('/board/create', boardData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createListToBoardId = async (token: string, boardId: bigint) => {
    try {
        const response = await apiClient.post(`/board/list/create`, {boardId}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateBoard = async (token: string, boardData: any) => {
    try {
        const response = await apiClient.put(`/board/update`, boardData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteBoard = async (token: string, boardId: number) => {
    try {
        const response = await apiClient.delete(`/board/delete/${boardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}


export const addMemberToBoard = async (token: string, boardId: bigint, emailOrUsername: string, role: string) => {
    try {
        const response = await apiClient.post(`/board/addMember`, {boardId, emailOrUsername, role}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removeMemberFromBoard = async (token: string, boardId: bigint, userId: bigint) => {
    try {
        const response = await apiClient.delete(`/board/removeMember/${boardId}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}