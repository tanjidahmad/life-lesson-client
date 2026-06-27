import { serverFetch,serverDelete, serverPatch , serverMutation,} from "../core/server";
export const addFavorite = async (
  lessonId,
  userEmail
) => {
  return serverMutation(
    "/api/favorites",
    {
      lessonId,
      userEmail,
    }
  );
};

export const getComments = async (
  lessonId
) => {
  return serverFetch(
    `/api/comments/${lessonId}`
  );
};

export const addComment = async (
  data
) => {
  return serverMutation(
    "/api/comments",
    data
  );
};

export const reportLesson = async (
  data
) => {
  return serverMutation(
    "/api/reports",
    data
  );
};





export const toggleLike = async (
  lessonId,
  userEmail
) => {
  return serverPatch(
    `/api/lessons/like/${lessonId}`,
    { userEmail }
  );
};




export const getLessons = async () => {
  return serverFetch("/api/lessons?limit=1000");
};

export const getLessonById = async (id) => {
  return serverFetch(`/api/lessons/${id}`);
};

export const getFeaturedLessons = async () => {
  return serverFetch("/api/featured-lessons");
};

export const getDashboardStats = async () => {
  return serverFetch("/api/dashboard-stats");
};

export const getMyLessons = async (email) => {
  return serverFetch(`/api/my-lessons/${email}`);
};
export const deleteLesson = async (id) => {
  return serverDelete(`/api/lessons/${id}`);
};



export const updateLesson = async (
  id,
  data
) => {
  return serverPatch(
    `/api/lessons/${id}`,
    data
  );
};

export const getFilteredLessons = async ({
  search = "",
  category = "",
  emotionalTone = "",
  sort = "",
  page = 1,
}) => {
  const params = new URLSearchParams({
    search,
    category,
    emotionalTone,
    sort,
    page,
    limit: 6,
  });

  return serverFetch(
    `/api/lessons?${params.toString()}`
  );
};

export const getFavorites = async (
  email
) => {
  return serverFetch(
    `/api/favorites/${email}`
  );
};

export const removeFavorite =
  async (id) => {
    return serverDelete(
      `/api/favorites/${id}`
    );
  };
export const featureLesson = async (id) => {
  return serverPatch(
    `/api/lessons/featured/${id}`
  );
};

export const reviewLesson = async (id) => {
  return serverPatch(
    `/api/lessons/reviewed/${id}`
  );
};
export const getReportedLessons =
  async () => {
    return serverFetch(
      "/api/admin/reported-lessons"
    );
  };

export const ignoreReports =
  async (lessonId) => {
    return serverDelete(
      `/api/reports/ignore/${lessonId}`
    );
  };
  export const getLessonReports =
  async (lessonId) => {
    return serverFetch(
      `/api/reports/${lessonId}`
    );
  };
  export const getTopContributors =
  async () => {
    return serverFetch(
      "/api/top-contributors"
    );
  };
  export const getMostSavedLessons =
  async () => {
    return serverFetch(
      "/api/most-saved-lessons"
    );
  };
