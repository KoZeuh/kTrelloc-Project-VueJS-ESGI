import apiClient from '@/apiClient';
import ErrorService from '@/services/errorService';

export const getUser = async (token: string) => {
    try {
        const response = await apiClient.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(ErrorService.getErrorMessage(error));
    }
};

export const updateUserEmail = async (token: string, userEmail: string) => {
    try {
        const response = await apiClient.put('/user/profile/update/email', {email: userEmail}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(ErrorService.getErrorMessage(error));
    }
};

export const loginUser = async (userData: object) => {
  try {
    const response = await apiClient.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw new Error(ErrorService.getErrorMessage(error));
  }
};

export const createUser = async (userData: object) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(ErrorService.getErrorMessage(error));
  }
};

