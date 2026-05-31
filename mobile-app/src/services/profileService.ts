import api
from
'./api';

import {
  getToken,
}
from
'@utils/secureStorage';

export const
completeProfileAPI =
async (
  data:{
    mobile:string;
    yearOfStudy:string;
    branch:string;
    section:string;
  }
) => {

  const token =
    await getToken();

  const response =
    await api.put(
      '/auth/complete-profile',
      data,
      {
        headers:{
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};