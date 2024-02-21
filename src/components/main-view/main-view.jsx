import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user";
export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const { user, token } = useSelector((state) => state.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const filter = useSelector((state) => state.movies.filter).trim().toLowerCase();
  const filteredMovies = movies.filter((movie) => movie.Title && movie.Title.toLowerCase().includes(filter));

  const dispatch = useDispatch();

  useEffect(() => {
    if (storedUser && storedToken) {
      dispatch(setUser({ user: storedUser, token: storedToken }));
    }
  }, [dispatch]);

  // fetch data from Api
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://awolf-movies-app.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setMovies(data)); // Corrected line
      });
  }, [token, dispatch]);

  const addFav = (_id) => {
    fetch(`https://awolf-movies-app.onrender.com/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to add movie");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
    }).catch(error => {
      console.error("Error: ", error);
    });
  };

  const removeFav = (_id) => {
    fetch(`https://awolf-movies-app.onrender.com/users/${user.Username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to remove movie")
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
    }).catch(error => {
      console.error("Error: ", error);
    });
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          dispatch(setUser({ user: null, token: null }));
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }}
      />
      <Row className="main-container d-flex justify-content-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <Col md={5}>
                <SignupView />
              </Col>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>There are no movies in the list!</Col>
                ) : (
                  <>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard movie={movie} user={user} setUser={setUser} token={token} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      movies={movies}
                      removeFav={removeFav}
                      addFav={addFav}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};


// import { useEffect, useState } from "react";
// import { MovieCard } from "../movie-card/movie-card";
// import { MovieView } from "../movie-view/movie-view";
// import { SignupView } from "../signup-view/signup-view";
// import { LoginView } from "../login-view/login-view";
// import { NavigationBar } from "../navigation-bar/navigation-bar";
// import { ProfileView } from "../profile-view/profile-view";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import "./main-view.scss";
// import { useSelector, useDispatch } from "react-redux";
// import { setMovies } from "../../redux/reducers/movies";
// import { setUser } from "../../redux/reducers/user";
// // import { MoviesList } from "../movies-list/movies-list";
// // import { MoviesFilter } from "../movies-filter/movies-filter";




// export const MainView = () => {
//   const movies = useSelector((state) => state.movies.list);
//   const { user, token } = useSelector((state) => state.user);

//   //NIzar
//   // let storedUser = null;
//   // try {
//   //   const userFromStorage = localStorage.getItem("user");
//   //   if (userFromStorage) {
//   //     storedUser = JSON.parse(userFromStorage);
//   //   }
//   // } catch (error) {
//   //   console.error("Error parsing user from localStorage:", error);
//   //   // Handle the error (e.g., clearing the invalid item or notifying the user)
//   // }

//   // lines above(25-34) - trying something else (in useEffect bellow)-Anca

//   //NIzar
//   // const storedToken = localStorage.getItem("token"); - moved in useEffect(Anca)
//   // const [user, setUser] = useState(storedUser ? storedUser : null);
//   // const [token, setToken] = useState(storedToken ? storedToken : null);
//   // const [movies, setMovies] = useState([]);

//   const filter = useSelector((state) => state.movies.filter).trim().toLowerCase();
//   const filteredMovies = movies.filter((movie) => movie.Title && movie.Title.toLowerCase().includes(filter));


//   movies.forEach(movie => console.log(movie.Title));

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const storedToken = localStorage.getItem("token");
//     if (storedUser && storedToken) {
//       dispatch(setUser({ user: storedUser, token: storedToken }));
//     }
//   }, [dispatch]);

//   // fetch data from Api
//   useEffect(() => {
//     if (!token) {
//       return;
//     }
//     fetch("https://awolf-movies-app.onrender.com/movies", {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setMovies(data);
//       });
//   }, [token]);

//   const addFav = (_id) => {
//     fetch(`https://awolf-movies-app.onrender.com/users/${user.Username}/movies/${movie._id}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         alert("Failed to add movie");
//       }
//     }).then((user) => {
//       if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//         setUser(user);
//       }
//     }).catch(error => {
//       console.error("Error: ", error);
//     });
//   };

//   const removeFav = (_id) => {
//     fetch(`https://awolf-movies-app.onrender.com/users/${user.Username}/movies/${movie._id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         alert("Failed to remove movie")
//       }
//     }).then((user) => {
//       if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//         setUser(user);
//       }
//     }).catch(error => {
//       console.error("Error: ", error);
//     });
//   };

//   return (
//     <BrowserRouter>
//       <NavigationBar
//         user={user}
//         onLoggedOut={() => {
//           setUser(null);
//           setToken(null);
//           localStorage.clear()
//           // localStorage.removeItem("token");
//           // localStorage.removeItem("user");
//         }}
//       />
//       <Row className="main-container d-flex justify-content-center">
//         <Routes>
//           <Route
//             path="/signup"
//             element={
//               <Col md={5}>
//                 <SignupView />
//               </Col>
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               <>
//                 {user ? (
//                   <Navigate to="/" />
//                 ) : (
//                   <Col md={5}>
//                     <LoginView onLoggedIn={(user) => setUser(user)} />
//                   </Col>
//                 )}
//               </>
//             }
//           />
//           <Route
//             path="/movies/:movieId"
//             element={
//               <>
//                 {!user ? (
//                   <Navigate to="/login" replace />
//                 ) : movies.length === 0 ? (
//                   <Col>The list is empty!</Col>
//                 ) : (
//                   <Col md={8}>
//                     {/* <MovieView movies={movies} /> */}
//                     <MovieView user={user} token={token} setUser={setUser} />
//                   </Col>
//                 )}

//               </>
//             }
//           />
//           <Route
//             path="/"
//             element={
//               <>
//                 {!user ?

//                   (
//                     <Navigate to="/login" replace />
//                   ) : movies.length === 0 ? (
//                     <Col>There are no movies in the list!</Col>
//                   ) : (
//                     <>
//                       {filteredMovies.map((movie) => (
//                         <Col className="mb-5" key={movie._id} md={3}>
//                           <MovieCard movie={movie} user={user} setUser={setUser} token={token} />
//                         </Col>
//                       ))}
//                     </>
//                   )
//                 }
//               </>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <>
//                 {!user ? (
//                   <Navigate to="/login" replace />
//                 ) : (
//                   <Col>
//                     <ProfileView
//                       user={user}
//                       movies={movies}
//                       removeFav={removeFav}
//                       addFav={addFav}
//                       setUser={setUser}
//                     />
//                   </Col>
//                 )}
//               </>
//             }
//           />
//         </Routes>
//       </Row>
//     </BrowserRouter>
//   );
// };
