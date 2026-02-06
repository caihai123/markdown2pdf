import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        padding: "12px 0",
        borderTop: "1px solid #ccc",
        fontSize: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        © 2026 Made with
        <span style={{ padding: "0 5px", color: "#e5e0d8" }}>❤️</span> by Cai
        Hai
      </div>
    </Box>
  );
}
