const getMovieGenres = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmZiNGNlMzE4ZWEyMzFmODJjN2Y3MTc5NmFhM2M2ZSIsInN1YiI6IjY1NzBkZjkyZGQ3MzFiMDBhYjk2Nzc0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F4GA0UkBmMTH3hTtFSbrMrSBqudmtfgqt4w1tmAKyIU",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("There was a problem fetching movie genres:", error);
    return [];
  }
};

export { getMovieGenres };
