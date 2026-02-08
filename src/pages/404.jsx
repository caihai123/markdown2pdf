import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "6rem", fontWeight: "bold", color: "#1976d2" }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 3 }}>
        页面未找到
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        很抱歉，你访问的页面不存在或者已被移除。
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        返回首页
      </Button>
    </Box>
  );
};

export default NotFoundPage;
