import axios from 'axios';
import { message } from 'antd';
import { BACKEND_URL } from '@/utils/configs';

interface MenuItem {
  id: string;
  name: string;
}

export const fetchMenuItems = async (restaurant_id: string): Promise<MenuItem[]> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/menus/${restaurant_id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      message.error('Failed to fetch menu items.');
      return [];
    }
  } catch (error) {
    message.error('Failed to fetch menu items.');
    return [];
  }
};
