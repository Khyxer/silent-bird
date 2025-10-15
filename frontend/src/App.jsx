import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage";
import { MainPageLayout } from "./layouts/MainPageLayout";
import { MainPage } from "./pages/main/MainPage";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContexts";
import { UserProfilePage } from "./pages/user/UserProfilePage";
import { ComingSoon } from "./pages/general/ComingSoon";

function App() {
  return (
    // Proveedor de usuario
    <UserProvider>
      {/* Notificaciones */}
      <Toaster />

      {/* Rutas */}
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          {/* Rutas de autenticación */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/register" element={<AuthPage />} />

          {/* Rutas principales */}
          <Route path="/" element={<MainPageLayout />}>
            <Route index element={<MainPage />} />
            <Route path="user/:userName" element={<UserProfilePage />} />
          </Route>

          {/* Proximamente */}
          <Route path="/mensajes" element={<ComingSoon />} />
          <Route path="/posts" element={<ComingSoon />} />
          <Route path="/tendencias" element={<ComingSoon />} />

          {/* Protected Routes */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
