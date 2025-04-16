import axiosInstance from "./axiosInstance";


export const addSession = async (sessionData) => {
  try {
    const response = await axiosInstance.post("/session/add", sessionData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};


export const startSession = async (sessionid) => {
  try {
    const response = await axiosInstance.post("/session/start", {
      sessionid,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};


export const editSession = async (editData) => {
  try {
    const response = await axiosInstance.put("/session/edit", editData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};


export const getSessionEndDetails = async (sessionid) => {
  try {
    const response = await axiosInstance.get(
      `/session/enddetail?sessionid=${sessionid}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};


export const endSession = async (endData) => {
  try {
    const response = await axiosInstance.post("/session/end", endData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};


export const getPatientCount = async (sessionid) => {
  try {
    const response = await axiosInstance.get(
      `/session/patient/count?sessionid=${sessionid}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};


const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    return {
      success: false,
      message: error.response.data.message || "Something went wrong",
    };
  } else {
    return { success: false, message: "Network error or server unreachable" };
  }
};
