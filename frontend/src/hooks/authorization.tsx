import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';

export function authData() {
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        window.alert("Token Missing");
        return;
      }

      try {
        const response = await api.get('authorization', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setData(response.data);
        } else {
          window.alert("UNAUTHORIZED")
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [navigate]);

  return data;
}
