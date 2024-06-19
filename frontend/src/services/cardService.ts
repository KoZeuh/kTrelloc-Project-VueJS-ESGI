import apiClient from '@/apiClient';

export const updateTitle = async (token: string, cardId: bigint, title: string) => {
    try {
        const response = await apiClient.put(`/board/card/update/title`, { cardId, title }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateDescription = async (token: string, cardId: bigint, description: string) => {
    try {
        const response = await apiClient.put(`/board/card/update/description`, { cardId, description }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }

}
 export const deleteCard = async (token: string, cardId: bigint) => {
    try {
        const response = await apiClient.delete(`/board/card/delete/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addChecklistToCardId = async (token: string, cardId: BigInt) => {
    try {
        const response = await apiClient.post(`/board/card/checklist/add`, { cardId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addMemberToCardId = async (token: string, cardId: number, memberId: number) => {
    try {
        const response = await apiClient.post(`/board/card/member/add`, {cardId, memberId}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw error;
    }
}

export const removeCardMemberById = async (token: string, memberId: bigint) => {
    try {
        const response = await apiClient.delete(`/board/card/member/remove/${memberId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAttachmentsByCardId = async (token: string, cardId: bigint) => {
    try {
        const response = await apiClient.get(`/board/card/attachment/get/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addAttachmentToCardId = async (token: string, cardId: bigint, data: FormData) => {
    try {
        const response = await apiClient.post(`/board/card/attachment/add/${cardId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAttachmentById = async (token: string, attachmentId: bigint) => {
    try {
        const response = await apiClient.delete(`/board/card/attachment/remove/${attachmentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const archiveCardById = async (token: string, cardId: bigint) => {
    try {
        const response = await apiClient.put(`/board/card/archive/${cardId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}


export const updateCardDeadlineById = async (token: string, data: any) => {
    try {
        const response = await apiClient.put(`/board/card/update/deadline`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const duplicateCardById = async (token: string, cardId: bigint) => {
    try {
        const response = await apiClient.post(`/board/card/duplicate/${cardId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}
export const downloadAttachmentByUrl = async (token: string, url_: string) => {
    try {
        const url = window.URL.createObjectURL(new Blob([url_]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attachment');
        document.body.appendChild(link);
        link.click();

        return true;
    } catch (error) {
        throw error;
    }
}